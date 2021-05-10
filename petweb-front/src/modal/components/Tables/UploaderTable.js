import React, { Component } from 'react';
import IconDelete from '../../../images/IconDelete';
import './UploaderTable.css'

const FilterableTable = require('react-filterable-table');

export default class UploaderTable extends Component {
  constructor(props) {
    super(props);
    this.renderRemove = this.renderRemove.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderTracer = this.renderTracer.bind(this);
    // this.runFiles = this.runFiles.bind(this);
    // this.state = {
    //   data:[],
      // data: [
      //   { id:0, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_101.nii", Remove: "" },
      //   { id:1, Focus:false, Select: true, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_102.nii", Remove: "" },
      //   { id:2, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_103.nii", Remove: "" },
      //   { id:3, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_104.nii", Remove: "" },
      //   { id:4, Focus:false, Select: false, Tracer:"FBP", PatientName: "Sandwich Eater", FileName: "SNUH_105.nii", Remove: ""    },
      //   { id:5, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_101.nii", Remove: "" },
      //   { id:6, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_102.nii", Remove: "" },
      //   { id:7, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_103.nii", Remove: "" },
      //   { id:8, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_104.nii", Remove: "" },
      //   { id:9, Focus:false, Select: false, Tracer:"FBP", PatientName: "Sandwich Eater", FileName: "SNUH_105.nii", Remove: ""    },
      // ],
    // };
  }
  // runFiles = async () =>{
  //   const {data} = this.state;
  //   console.log(data)
  // }
  renderRemove = (props) => {
    // const { data } = this.state;
      return(
        <div className={`UploaderTable-Default ${props.record.Select && 'sel'}`} 
          onClick={()=>{
                this.props.removeFileList(props.record)
                // this.setState({
                //   data: data.filter(item => item.id !== props.record.id)
                // })
                // console.dir(props)
              }
            }
          >
          <div style={{userSelect:"none"}}>
              <IconDelete className="UploaderIcon-Delete"/>
          </div>
        </div>
      );
  }
  renderClick = (props) => {
    // const { data } = this.state;
      return(
          <div className={`UploaderTable-Default ${props.record.Select && 'sel'} ${props.record.Focus && 'focus'}`} 
            onClick={(e)=>{
                  this.props.updateFileList(props.record)
                  // this.setState({
                  //   // data:[...data, props.record]
                  //   data: data.map(
                  //     item => item.id === props.record.id ?
                  //       { ...item, ...{Select:!props.record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                  //         : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
                  //   ),
                  // });
                  this.props.getJPGURL(props.record.FileName)
                  this.props.setListID(props.record.id)
                }
              }
            >
              <div className="Hide-Scroll">{props.value}</div>
          </div>
      );
  }
  renderTracer = (props) => {
    // const { data } = this.state;
      return(
        <div className={`UploaderTable-Default ${props.record.Select && 'sel'} ${props.record.Focus && 'focus'}`} 
            onClick={(e)=>{
                this.props.updateFileList(props.record)
                // this.setState({
                //   // data:[...data, props.record]
                //   data: data.map(
                //     item => props.record.id === item.id ?
                //     { ...item, ...{Select:!props.record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                //       : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
                //   ),
                // });
                this.props.getJPGURL(props.record.FileName)
                this.props.setListID(props.record.id)
              }
            }
          >
          <div className={`UploaderTable-Tracer ${this.props.selectTracer.slice(-3)}`}>
              {/* <div>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.selectTracer}</div> */}
              <div>&emsp;[<sup>{this.props.selectTracer.split(/[\[,\]]/)[1].slice(0,-1)}</sup>{this.props.selectTracer.split(/[\[,\]]/)[1].slice(-1)}]{this.props.selectTracer.split(/[\[,\]]/)[2]}</div>
          </div>
        </div>
      );
  }
  // componentWillUnmount(){
  //   const {runFiles} = this;
  //   console.log('componentWillUnmount', this.props.runCall)
  //   if (this.props.runCall == true){
  //     runFiles();
  //   }
  // }
  // componentDidUpdate(prevProps){
  //   if (prevProps.fileList !== this.props.fileList){
  //     console.log('componentDidUpdate in uploaderTable')
  //     this.setState({
  //       data:this.props.fileList,
  //     })
  //   }
  // }
  render() {
    // const {data} = this.state;
    const {fileList, getJPGURL} = this.props;
    console.log("uploaderTable",fileList)
    const fields = [
      { render: this.renderTracer, name: 'Tracer', displayName: "Tracer", inputFilterable: true, sortable: true },
      { render: this.renderClick, name: 'PatientName', displayName: "PatientName", inputFilterable: true, exactFilterable: false, sortable: true },
      { render: this.renderClick, name: 'FileName', displayName: "FileName", inputFilterable: true, exactFilterable: false, sortable: true },
      { render: this.renderRemove, name: 'Remove', displayName: "", inputFilterable: true, exactFilterable: false, sortable: true },
    ];
    return (
      <FilterableTable
          className="UploaderTable"
          tableClassName="UploaderTable"
          // trClassName="WorklistTable"
          namespace="UploaderTable"
          initialSort="name"
          data={fileList}
          fields={fields}
          noRecordsMessage="There are no people to display"
          noFilteredRecordsMessage="No people match your filters!"
          pageSize={500}
      />
    );
  }
}