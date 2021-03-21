import React, { Component } from 'react';
import './ChecklistTable.css'
import { connect } from 'react-redux';
import * as actions from '../../../reduxs/actions';
import IconDelete from '../../../images/IconDelete';

const FilterableTable = require('react-filterable-table');

class ChecklistTable extends Component {
    state={
        data: [],
        // data: [
        //     {id:0, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.11, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 38, Sex:"M", Update:"20.07.15" },
        //     {id:1, Focus:false, Select:false, Tracer: "FBB", SUVR: 1.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 26, Sex:"M", Update:"20.07.15" },
        //     {id:2, Focus:false, Select:false, Tracer: "FBB", SUVR:1.1, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 39, Sex:"M", Update:"20.07.15" },
        //     {id:3, Focus:false, Select:false, Tracer: "FBP", SUVR: 2.1, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 33, Sex:"M", Update:"20.07.15" },
        //     {id:4, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 34, Sex:"M", Update:"20.07.15"  },
        
        //     {id:5, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.51, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 42, Sex:"M", Update:"20.07.15" },
        //     {id:6, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 1.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 55, Sex:"M", Update:"20.07.15" },
        //     {id:7, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 1.52, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15" },
        //     {id:8, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 0.72, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 46, Sex:"M", Update:"20.07.15" },
        //     {id:9, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 88, Sex:"M", Update:"20.07.15"  },
        
        //     {id:10, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 56, Sex:"M", Update:"20.07.15" },
        //     {id:11, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.8, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 47, Sex:"M", Update:"20.07.15" },
        //     {id:12, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 3.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 86, Sex:"M", Update:"20.07.15" },
        //     {id:13, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 66, Sex:"M", Update:"20.07.15" },
        //     {id:14, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.9, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15"  },
        
        //     {id:15, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 56, Sex:"M", Update:"20.07.15" },
        //     {id:16, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.8, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 47, Sex:"M", Update:"20.07.15" },
        //     {id:17, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 3.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 86, Sex:"M", Update:"20.07.15" },
        //     {id:18, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 66, Sex:"M", Update:"20.07.15" },
        //     {id:19, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.9, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15"  },
        
        //     {id:20, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 56, Sex:"M", Update:"20.07.15" },
        //     {id:21, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.8, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 47, Sex:"M", Update:"20.07.15" },
        //     {id:22, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 3.0, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 86, Sex:"M", Update:"20.07.15" },
        //     {id:23, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.5, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 66, Sex:"M", Update:"20.07.15" },
        //     {id:24, Focus:false, Select:false, Tracer: "C-PIB", SUVR: 2.9, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 72, Sex:"M", Update:"20.07.15"  },
        // ],
    }
    componentDidMount(){
        const {fileList} = this.props;
        this.setState({
            data:fileList.filter(item=>{return item.Group==1}),
        })
    }
    componentDidUpdate(prevProps){
        // console.log('componentDidUpdate1:',prevProps.fileList)
        // console.log('componentDidUpdate2:',this.props.fileList)
        if (prevProps.fileList !== this.props.fileList){
            // console.log('componentDidUpdate3:',this.props.fileList)
            const {fileList} = this.props;
            this.setState({
                data:fileList.filter(item=>{return item.Group==1}),
            })
        }
    }
    renderRemove = (props) => {
      // const { data } = this.state;
        return(
          <div className={`ChecklistTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
            onClick={()=>{
                    this.props.ungroupItemIndividual(props.record.fileID)
                //   this.props.removeFileList(props.record)
                  // this.setState({
                  //   data: data.filter(item => item.id !== props.record.id)
                  // })
                  // console.dir(props)
                }
              }
            >
            <div style={{userSelect:"none"}}>
                <IconDelete className="ChecklistIcon-Delete"/>
            </div>
          </div>
        );
    }
    renderSelect = (props) => {
        const {data} = this.state;
        return(
            <div className={`ChecklistTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                    onClick={()=>{
                        {props.record.Select ? this.props.unselectItem(props.record.id):this.props.selectItem(props.record.id)}
                        // this.setState({
                        // // data:[...data, props.record]
                        //     data: data.map(
                        //     item => props.record.id === item.id ?
                        //     { ...item, ...{Select:!props.record.Select} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                        //     : {...item} // 기존의 값을 그대로 유지
                        //     ),
                        // });
                        // console.dir(props)
                    }
                }
                    >
                <div className={`ChecklistTable-Select ${props.value && 'act'}`}>
                    <div></div>
                </div>
            </div>
        );
    }
    renderTracer = (props) => {
        const {data} = this.state;
        return(
            <div className={`ChecklistTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`}
                onDoubleClick={()=>{
                    {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
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
                <div className={`ChecklistTable-Tracer ${props.value.slice(-3)}`}  >
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.value}</div>
                </div>
            </div>
        );
    }
    renderClick = (props) => {
        const {data} = this.state;
        return(
            <div className={`ChecklistTable-Default ${props.record.Select && 'sel'} ${props.record.Opened && 'opened'}`} 
                        onDoubleClick={()=>{
                            {props.record.Opened ? this.props.closeItem(props.record.id):this.props.openItem(props.record.id)}
                                // this.setState({
                                //     // data:[...data, props.record]
                                //     data: data.map(
                                //     item => props.record.id === item.id ?
                                //     { ...item, ...{Select:!props.record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                                //       : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
                                //     ),
                                // });
                                // console.dir(props)
                            }
                        }
                    >
                {props.value}
            </div>
        );
    }
    render() {
        const {data} = this.state;
        const fields = [
            { render: this.renderSelect, name: 'Select', displayName: "Select", inputFilterable: true, sortable: true},
            { render: this.renderTracer, name: 'Tracer', displayName: "Tracer", inputFilterable: true, sortable: true },
            // { render: this.renderSUVR, name: 'SUVR', displayName: "SUVR", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'PatientName', displayName: "PatientName", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'PatientID', displayName: "PatientID", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Age', displayName: "Age", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderClick, name: 'Sex', displayName: "Sex", inputFilterable: true, exactFilterable: false, sortable: true },
            { render: this.renderRemove, name: 'Remove', displayName: "", inputFilterable: true, exactFilterable: false, sortable: true },
            // { render: this.renderClick, name: 'Update', displayName: "Update", inputFilterable: true, exactFilterable: false, sortable: true },
        ];
        return (
            <FilterableTable
                className="ChecklistTable"
                tableClassName="ChecklistTable"
                // trClassName="ChecklistTable"
                namespace="ChecklistTable"
                initialSort="name"
                data={data}
                fields={fields}
                noRecordsMessage="There are no people to display"
                noFilteredRecordsMessage="No people match your filters!"
                pageSize={20}
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
  ungroupItemIndividual: (itemID) => dispatch(actions.ungroupItemIndividual(itemID)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChecklistTable);