import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UploadTable.css'
import { connect } from 'react-redux';
import * as actions from '../../../reduxs/actions';
import spinner from '../../../images/gif/spinner5.gif'
import * as services from '../../../services/fetchApi'
import { withRouter } from 'react-router-dom';
// import IconQuestion from '../../../images/IconQuestion'
import IconQuestion from '../../../images/IconQuestion.png'

const FilterableTable = require('react-filterable-table');
 
class UploadTable extends Component {
    constructor(props) {
      super(props);
      this.wrapper = React.createRef();
      this.handleSelect = this.handleSelect.bind(this);
      this.state={
          data: [],
          selectAll: false,
          clickListenerState: false,
      }
    }
    handleSelect = event => {
        const {selectAll} = this.state;
        console.log(selectAll)
        if (selectAll==false) {
            this.props.selectAllTrue();
            this.setState({
                selectAll: true,
            })
        }
        else {
            this.props.selectAllFalse();
            this.setState({
                selectAll: false,
            })
        }
        // console.log('Enter: ' + this.props.menuItem.caption.toUpperCase());
    }
    componentDidMount = async() =>{
        const {fileList} = this.props;
        const token = localStorage.getItem('token')
        const res = await services.testing({'token':token})
        let newdata = res.data
        // console.log("interval: ",data!=this.state.data, data,this.state.data)
        console.log('UploadTable-componentDidMount-updateCentiloid')
        if (newdata!=this.state.data){
            // console.log('data changed: ', newdata, fileList, fileList.map((v,i)=>{return {...v, Centiloid:newdata.filter(vv=>vv.id==v.id).Centiloid}}))
            this.props.updateCentiloid(newdata)
            try{
                const newfileList = fileList.map((v,i)=>{return {...v, Centiloid:newdata.filter(vv=>vv.id==v.id)[0].Centiloid}});
                this.setState({
                    data:newfileList,
                })
            } catch (e) {
                this.setState({
                    data:newdata,
                })
            }
        } else {
            this.setState({
                data:fileList,
            })
        }
        this.myTimer();
    }
    myTimer = async()=>{
        this.myInterval = setInterval(async ()=>{
            const token = localStorage.getItem('token')
            const res = await services.testing({'token':token})
            let data = res.data
            // console.log("interval: ",data!=this.state.data, data,this.state.data)
            console.log('UploadTable-componentDidMount-myTimer')
            if (data!=this.state.data){
                // console.log('data changed: ', this.state.data)
                this.props.updateCentiloid(data)
            }
        }, 10000)
    }
    componentWillUnmount(){
        clearInterval(this.myInterval);
        try{
            ReactDOM.findDOMNode(this).children[1].children[0].children[0].children[0].children[0].children[0].removeEventListener('click', this.handleSelect);
            this.setState({clickListenerState:false})
        } catch(e){
            console.log('findDOMNode error when componentWillUnmount')
        }
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.fileList != this.props.fileList){
            // console.log('componentDidUpdate in UploadTable(fileList):',this.props.fileList)
            const {fileList} = this.props;
            this.setState({
                data:fileList,
            })
        }
        if (this.state.clickListenerState==false){
            try{
                // console.log(ReactDOM.findDOMNode(this).children[1].children[0].children[0].children[0].children[0].children[0])
                ReactDOM.findDOMNode(this).children[1].children[0].children[0].children[0].children[0].children[0].addEventListener('click', this.handleSelect);
                this.setState({clickListenerState:true})
            }catch(e){
                // console.log('findDOMNode error when componentDidUpdate')
            }
        }
        // console.log(temp.children[1].children[0])
        // console.dir(temp.children[1].children[0])
        // console.log(temp.children[1].children[0].childNodes)
        // console.dir(temp.children[1].children[0].childNodes)
        // console.log(temp.children[1].children[0].childNodes[0])
        // console.dir(temp.children[1].children[0].childNodes[0])
        // console.log(temp.children[1].children[0].children[0].childNodes)
        // console.dir(temp.children[1].children[0].children[0].childNodes)
    }
    renderSelect = (props) => {
        const {data} = this.state;
        return(
            <div className={`UploadTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                        onClick={()=>{{props.record.Centiloid != null && (props.record.Select ? this.props.unselectItem(props.record.id):this.props.selectItem(props.record.id))}}}
                >
                <div className={`UploadTable-Select ${props.value && 'act'}`} >
                    <div></div>
                </div>
            </div>
        );
    }
    renderClick = (props) => {
        const {data} = this.state;
        return(
            <div className={`UploadTable-Default ${props.record.Centiloid == null && 'unact'} ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                            onClick={()=>{{props.record.Centiloid != null && (props.record.Select ? this.props.unselectItem(props.record.id):this.props.selectItem(props.record.id))}}}
                            onDoubleClick={()=>{
                                const nextStackManager = [...this.props.stackManager, ...this.props.fileList.filter((v, i)=>v.Opened == false && v.fileID == props.record.fileID).map(v=>{return {fileID:v.fileID, currentC:50, currentS:50, currentA:50, PatientName:v.PatientName, PatientID:v.PatientID, Age:v.Age, Sex:v.Sex, in_suvr_max:v.in_suvr_max, in_suvr_min:v.in_suvr_min, out_suvr_max:v.out_suvr_max, out_suvr_min:v.out_suvr_min}})];
                                const isNewlyOpened = nextStackManager.length!==this.props.stackManager.length
                                // {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                {props.record.Centiloid != null && (this.props.openItem(props.record.id))}
                                // {console.log('counter: ',this.props.counter, props.record.fileID)}
                                // ...fileList.filter((v,i)=>{if(v.Opened == false && v.Select == true) return {fileID:v.fileID, currentC:50, currentS:50, currentA:50}})
                                {props.record.Centiloid != null && this.props.addStack(nextStackManager)};
                                {(props.record.Centiloid != null && isNewlyOpened) ? this.props.tab_location({...this.props.counter, tabX:nextStackManager.length-1, fileID: props.record.fileID}):this.props.tab_location({...this.props.counter, tabX:this.props.stackManager.findIndex(item=>item.fileID==props.record.fileID), fileID: props.record.fileID})};
                                // {console.log('stackManager: ', nextStackManager.length)}
                                // {props.record.Centiloid != null && this.props.tab_location({...this.props.counter, tabX:this.props.stackManger.length-1, fileID: props.record.fileID})}
                                // this.props.tab_location({...this.props.counter, tabX:0, fileID:props.record.fileID});
                                // {props.record.Centiloid != null && (this.props.tab_location({...this.props.counter, tabX: this.props.counter.tabX+1, fileID:props.record.fileID}))}

                                {props.record.Centiloid != null && (setTimeout(() => this.props.history.push('/analysis/suvr/'+props.record.fileID), 100))}
                            }}
                >
                {props.value}
            </div>
        );
    }
    renderTracer = (props) => {
        const {data} = this.state;
        return(
            <div className={`UploadTable-Default ${props.record.Centiloid == null && 'unact'} ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                            onClick={()=>{{props.record.Centiloid != null && (props.record.Select ? this.props.unselectItem(props.record.id):this.props.selectItem(props.record.id))}}}
                            onDoubleClick={()=>{
                                const nextStackManager = [...this.props.stackManager, ...this.props.fileList.filter((v, i)=>v.Opened == false && v.fileID == props.record.fileID).map(v=>{return {fileID:v.fileID, currentC:50, currentS:50, currentA:50, PatientName:v.PatientName, PatientID:v.PatientID, Age:v.Age, Sex:v.Sex, in_suvr_max:v.in_suvr_max, in_suvr_min:v.in_suvr_min, out_suvr_max:v.out_suvr_max, out_suvr_min:v.out_suvr_min}})];
                                const isNewlyOpened = nextStackManager.length!==this.props.stackManager.length
                                // {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                {props.record.Centiloid != null && this.props.openItem(props.record.id)}
                                {props.record.Centiloid != null && this.props.addStack(nextStackManager)};
                                {(props.record.Centiloid != null && isNewlyOpened) ? this.props.tab_location({...this.props.counter, tabX:nextStackManager.length-1, fileID: props.record.fileID}):this.props.tab_location({...this.props.counter, tabX:this.props.stackManager.findIndex(item=>item.fileID==props.record.fileID), fileID: props.record.fileID})};
                                // {props.record.Centiloid != null && setTimeout(() => this.props.history.push('/analysis/suvr/'+this.props.counter.tabX), 300)}
                                {props.record.Centiloid != null && (setTimeout(() => this.props.history.push('/analysis/suvr/'+props.record.fileID), 100))}
                           }}
                >
                <div className={`UploadTable-Tracer ${props.value.slice(-3)}`} >
                    {/* {console.log(props.value, props.value.split(/[\[,\]]/)[1].slice(0,-1))} */}
                    <div>&emsp;[<sup>{props.value.split(/[\[,\]]/)[1].slice(0,-1)}</sup>{props.value.split(/[\[,\]]/)[1].slice(-1)}]{props.value.split(/[\[,\]]/)[2]}</div>
                </div>
            </div>
        );
    }
    renderCentiloid = (props) => {
        const {data} = this.state;
        const styleDiv = {
            height: "100%",
            width: `${Math.min(100,Math.max(0,props.value))}%`,
            background:'red',
            borderRadius:"5px",
        }
        return(
            <div  className={`UploadTable-Default ${props.record.Centiloid == null && 'unact'} ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`}
                            onClick={()=>{{props.record.Centiloid != null && (props.record.Select ? this.props.unselectItem(props.record.id):this.props.selectItem(props.record.id))}}}
                            onDoubleClick={()=>{
                                const nextStackManager = [...this.props.stackManager, ...this.props.fileList.filter((v, i)=>v.Opened == false && v.fileID == props.record.fileID).map(v=>{return {fileID:v.fileID, currentC:50, currentS:50, currentA:50, PatientName:v.PatientName, PatientID:v.PatientID, Age:v.Age, Sex:v.Sex, in_suvr_max:v.in_suvr_max, in_suvr_min:v.in_suvr_min, out_suvr_max:v.out_suvr_max, out_suvr_min:v.out_suvr_min}})];
                                const isNewlyOpened = nextStackManager.length!==this.props.stackManager.length
                                // {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                {props.record.Centiloid != null && this.props.openItem(props.record.id)}
                                {props.record.Centiloid != null && this.props.addStack(nextStackManager)};
                                {(props.record.Centiloid != null && isNewlyOpened) ? this.props.tab_location({...this.props.counter, tabX:nextStackManager.length-1, fileID: props.record.fileID}):this.props.tab_location({...this.props.counter, tabX:this.props.stackManager.findIndex(item=>item.fileID==props.record.fileID), fileID: props.record.fileID})};
                                // {props.record.Centiloid != null && setTimeout(() => this.props.history.push('/analysis/suvr/'+this.props.counter.tabX), 500)}
                                {props.record.Centiloid != null && (setTimeout(() => this.props.history.push('/analysis/suvr/'+props.record.fileID), 100))}
                            }}
                >
                    {/* {console.log(props.record.Select && (props.record.Centiloid != null))} */}
                <div className={`UploadTable-SUVR ${props.record.Tracer.slice(-3)}`}>
                    {props.value != null ? 
                    // <span>{Number(props.value).toFixed(2)}</span>
                    <span>{Number(props.value).toFixed(2)}</span>
                    :<span>processing... &emsp;</span>}
                    {props.value != null ? 
                    <div style={{width: "150px", height:"5px", borderRadius:"5px",boxSizing:"border-box", background:"#383C41"}}>
                        <div style={styleDiv}></div>
                    </div>
                    :<span>&emsp;<img src={spinner} style={{width:"60px", height:"60px"}} alt="spinner"/></span>}
                </div>
            </div>
        );
    }
    render() {
        const {data} = this.state;
        const fields = [
            { render: this.renderSelect, name: 'Select', displayName: "Select", inputFilterable: false, sortable: false},
            { render: this.renderTracer, name: 'Tracer', displayName: "Tracer", inputFilterable: true, sortable: true },
            { render: this.renderCentiloid, name: 'Centiloid', displayName: <div style={{position:"relative", display:"flex", alignItems:"center", justifyContent:"center"}}>Centiloid &nbsp;&nbsp;&nbsp;<img className='UploadTable-IconQuestion' src={IconQuestion} width={'30px'} height={'30px'}/><span className="UploadTable-msg" >Centiloid composite ROI relative to whole cerebellum</span></div>, inputFilterable: true, exactFilterable: false, sortable: true },
            // { render: this.renderCentiloid, name: 'Centiloid', displayName: <div>Centiloid<IconQuestion width={'25px'} height={'25px'}/></div>, inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'PatientName', displayName: "PatientName", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'PatientID', displayName: "PatientID", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Age', displayName: "Birth Date", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Sex', displayName: "Sex", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'AcquisitionDateTime', displayName: "ScanDate", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Update', displayName: "Update", inputFilterable: true, exactFilterable: false, sortable: true, visible: true },
        ];
        return (
            <FilterableTable
                ref={this.wrapper}
                // className="UploadTable"
                // tableClassName="UploadTable"
                // trClassName="WorklistTable"
                namespace="UploadTable"
                initialSort="Update"
                initialSortDir={false}
                data={data}
                fields={fields}
                noRecordsMessage="There are no people to display"
                noFilteredRecordsMessage="No people match your filters!"
                pageSize={100}
            />
        );
    }
}
const mapStateToProps = (state) => ({
  // storeCount: state.count.count,
  counter:state.counter,
  isLogged:state.isLogged,
  stackManager:state.stackManager,
  fileList: state.fileList,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(actions.increment()),
  decrement: () => dispatch(actions.decrement()),
  login: () => dispatch(actions.login()),
  logout: () => dispatch(actions.logout()),
  tab_location: (items) => dispatch(actions.tab_location(items)),
  addStack: (items) => dispatch(actions.addStack(items)),
  openItem: (itemID) => dispatch(actions.openItem(itemID)),
  updateCentiloid: (items) => dispatch(actions.updateCentiloid(items)),
  closeItem: (itemID) => dispatch(actions.closeItem(itemID)),
  selectItem: (itemID) => dispatch(actions.selectItem(itemID)),
  unselectItem: (itemID) => dispatch(actions.unselectItem(itemID)),
  selectAllTrue: () => dispatch(actions.selectAllTrue()),
  selectAllFalse: () => dispatch(actions.selectAllFalse()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UploadTable));