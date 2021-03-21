import React, { Component } from 'react';
import './UploadTable.css'
import { connect } from 'react-redux';
import * as actions from '../../../reduxs/actions';

const FilterableTable = require('react-filterable-table');
 
class UploadTable extends Component {
    // const dispatch = useDispatch();
    state={
        data: [],
        // data1: [
        //     { id:0,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.11, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 38, Sex:"M", Update:"20.07.15" },
        //     { id:1,Opened:false, Select:false, Tracer: "FBB", SUVR: 1.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 26, Sex:"M", Update:"20.07.15" },
        //     { id:2,Opened:false, Select:false, Tracer: "FBB", SUVR:1.1, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 39, Sex:"M", Update:"20.07.15" },
        //     { id:3,Opened:false, Select:false, Tracer: "FBP", SUVR: 2.1, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 33, Sex:"M", Update:"20.07.15" },
        //     { id:4,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 34, Sex:"M", Update:"20.07.15"  },
        //     { id:5,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.51, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 42, Sex:"M", Update:"20.07.15" },
        //     { id:6,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 1.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 55, Sex:"M", Update:"20.07.15" },
        //     { id:7,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 1.52, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15" },
        //     { id:8,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 0.72, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 46, Sex:"M", Update:"20.07.15" },
        //     { id:9,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 88, Sex:"M", Update:"20.07.15"  },
        //     { id:10,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 56, Sex:"M", Update:"20.07.15" },
        //     { id:11,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.8, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 47, Sex:"M", Update:"20.07.15" },
        //     { id:12,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 3.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 86, Sex:"M", Update:"20.07.15" },
        //     { id:13,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 66, Sex:"M", Update:"20.07.15" },
        //     { id:14,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.9, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15"  },
        //     { id:15,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 56, Sex:"M", Update:"20.07.15" },
        //     { id:16,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.8, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 47, Sex:"M", Update:"20.07.15" },
        //     { id:17,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 3.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 86, Sex:"M", Update:"20.07.15" },
        //     { id:18,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 66, Sex:"M", Update:"20.07.15" },
        //     { id:19,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.9, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15"  },
        //     { id:20,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 56, Sex:"M", Update:"20.07.15" },
        //     { id:21,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.8, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 47, Sex:"M", Update:"20.07.15" },
        //     { id:22,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 3.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 86, Sex:"M", Update:"20.07.15" },
        //     { id:23,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 66, Sex:"M", Update:"20.07.15" },
        //     { id:24,Opened:false, Select:false, Tracer: "C-PIB", SUVR: 2.9, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15"  },
        // ],
    }
    componentDidMount(){
        const {fileList} = this.props;
        this.setState({
            data:fileList,
        })
    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.fileList != this.props.fileList){
            // console.log('componentDidUpdate')
            const {fileList} = this.props;
            this.setState({
                data:fileList,
            })
        }
    }
    renderSelect = (props) => {
        const {data} = this.state;
        return(
            <div className={`UploadTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                        onClick={()=>{
                            {props.record.Select ? this.props.unselectItem(props.record.id):this.props.selectItem(props.record.id)}
                            // this.setState({
                            //     data: data.map(
                            //     item => props.record.id === item.id ?
                            //     { ...item, ...{Select:!props.record.Select} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                            //       : {...item} // 기존의 값을 그대로 유지
                            //     ),
                            // });
                        }
                    }
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
            <div className={`UploadTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                            onDoubleClick={()=>{
                                {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                // {props.record.Opened ? this.props.removeFromList(props.record.id):this.props.addToList(props.record.id)}
                                
                                // this.setState({
                                //     // data:[...data, props.record]
                                //     data: data.map(
                                //     item => props.record.id === item.id ?
                                //     { ...item, ...{Opened:!props.record.Opened} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                                //         : {...item} // 기존의 값을 그대로 유지
                                //     ),
                                // });
                            }}
                >
                {props.value}
            </div>
        );
    }
    renderTracer = (props) => {
        const {data} = this.state;
        return(
            <div className={`UploadTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                           onDoubleClick={()=>{
                                {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                // {props.record.Opened ? this.props.removeFromList(props.record.id):this.props.addToList(props.record.id)}
                                
                                // this.setState({
                                //     // data:[...data, props.record]
                                //     data: data.map(
                                //     item => props.record.id === item.id ?
                                //     { ...item, ...{Opened:!props.record.Opened} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                                //         : {...item} // 기존의 값을 그대로 유지
                                //     ),
                                // });
                           }}
                >
                <div className={`UploadTable-Tracer ${props.value.slice(-3)}`} >
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.value}</div>
                </div>
            </div>
        );
    }
    renderCentiloid = (props) => {
        const {data} = this.state;
        const styleDiv = {
            height: "100%",
            width: `${Math.max(0,props.value)}%`,
            background:'red',
            borderRadius:"5px",
        }
        return(
            <div  className={`UploadTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`}
                            onDoubleClick={()=>{
                                {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                // {props.record.Opened ? this.props.removeFromList(props.record.id):this.props.addToList(props.record.id)}
                                // alert('double')
                                // this.setState({
                                //     // data:[...data, props.record]
                                //     data: data.map(
                                //     item => props.record.id === item.id ?
                                //     { ...item, ...{Opened:!props.record.Opened} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                                //         : {...item} // 기존의 값을 그대로 유지
                                //     ),
                                // });
                            }}
                >
                <div className={`UploadTable-SUVR ${props.record.Tracer.slice(-3)}`}>
                    {props.value != 0 ? 
                    // <span>{Number(props.value).toFixed(2)}</span>
                    <span>{Number(props.value).toFixed(2)}</span>
                    :<span>processing...</span>}
                    {props.value != 0 && 
                    <div style={{width: "150px", height:"5px", borderRadius:"5px",boxSizing:"border-box", background:"#383C41"}}>
                        <div style={styleDiv}></div>
                    </div>}
                </div>
            </div>
        );
    }
    render() {
        const {data} = this.state;
        const fields = [
            { render: this.renderSelect, name: 'Select', displayName: "Select", inputFilterable: true, sortable: true},
            { render: this.renderTracer, name: 'Tracer', displayName: "Tracer", inputFilterable: true, sortable: true },
            { render: this.renderCentiloid, name: 'Centiloid', displayName: "Centiloid", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'PatientName', displayName: "PatientName", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'PatientID', displayName: "PatientID", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Age', displayName: "Age", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Sex', displayName: "Sex", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Update', displayName: "Update", inputFilterable: true, exactFilterable: false, sortable: true },
        ];
        return (
            <FilterableTable
                // className="UploadTable"
                // tableClassName="UploadTable"
                // trClassName="WorklistTable"
                namespace="UploadTable"
                initialSort="name"
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
  openItem: (itemID) => dispatch(actions.openItem(itemID)),
  closeItem: (itemID) => dispatch(actions.closeItem(itemID)),
  selectItem: (itemID) => dispatch(actions.selectItem(itemID)),
  unselectItem: (itemID) => dispatch(actions.unselectItem(itemID)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UploadTable);