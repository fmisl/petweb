import React, { Component } from 'react';
import IconDelete from '../../../images/IconDelete';
import './UploaderTable.css'

const FilterableTable = require('react-filterable-table');
 
// let data = [
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_101.nii", Remove: "" },
//     { Select: true, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_102.nii", Remove: "" },
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_103.nii", Remove: "" },
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_104.nii", Remove: "" },
//     { Select: false, Tracer:"FBP", PatientName: "Sandwich Eater", FileName: "SNUH_105.nii", Remove: ""    },
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_101.nii", Remove: "" },
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_102.nii", Remove: "" },
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_103.nii", Remove: "" },
//     { Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_104.nii", Remove: "" },
//     { Select: false, Tracer:"FBP", PatientName: "Sandwich Eater", FileName: "SNUH_105.nii", Remove: ""    },
// ];

// const renderRemove = (props) => {
//     return(
//       <div className={`UploaderTable-Default ${props.record.Select && 'sel'}`} onClick={()=>console.dir(props)}>
//         <div style={{userSelect:"none"}}>
//             <IconDelete className="UploaderIcon-Delete"/>
//         </div>
//       </div>
//     );
// }
// const renderClick = (props) => {
//     return(
//         <div className={`UploaderTable-Default ${props.record.Select && 'sel'}`} onClick={()=>{console.dir(props)}}>
//             {props.value}
//         </div>
//     );
// }
// const renderTracer = (props) => {
//     return(
//       <div className={`UploaderTable-Default ${props.record.Select && 'sel'}`} onClick={()=>console.dir(props)}>
//         <div className={`UploaderTable-Tracer ${props.value}`}>
//             <div>&nbsp;&nbsp;&nbsp;&nbsp;{props.value}</div>
//         </div>
//       </div>
//     );
// }

// const fields = [
//     { render: renderTracer, name: 'Tracer', displayName: "Tracer", inputFilterable: true, sortable: true },
//     { render: renderClick, name: 'PatientName', displayName: "PatientName", inputFilterable: true, exactFilterable: false, sortable: true },
//     { render: renderClick, name: 'FileName', displayName: "FileName", inputFilterable: true, exactFilterable: false, sortable: true },
//     { render: renderRemove, name: 'Remove', displayName: "", inputFilterable: true, exactFilterable: false, sortable: true },
// ];
 
export default class UploaderTable extends Component {
  constructor(props) {
    super(props);
    this.renderRemove = this.renderRemove.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderTracer = this.renderTracer.bind(this);
    this.state = {
      data: [
        { id:0, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_101.nii", Remove: "" },
        { id:1, Focus:false, Select: true, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_102.nii", Remove: "" },
        { id:2, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_103.nii", Remove: "" },
        { id:3, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_104.nii", Remove: "" },
        { id:4, Focus:false, Select: false, Tracer:"FBP", PatientName: "Sandwich Eater", FileName: "SNUH_105.nii", Remove: ""    },
        { id:5, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_101.nii", Remove: "" },
        { id:6, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_102.nii", Remove: "" },
        { id:7, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_103.nii", Remove: "" },
        { id:8, Focus:false, Select: false, Tracer:"C-PIB", PatientName: "Sandwich Eater", FileName: "SNUH_104.nii", Remove: "" },
        { id:9, Focus:false, Select: false, Tracer:"FBP", PatientName: "Sandwich Eater", FileName: "SNUH_105.nii", Remove: ""    },
      ],
    };
  }
  renderRemove = (props) => {
    const { data } = this.state;
      return(
        <div className={`UploaderTable-Default ${props.record.Select && 'sel'}`} 
          onClick={()=>{
                this.setState({
                  data: data.filter(item => item.id !== props.record.id)
                })
                console.dir(props)
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
    const { data } = this.state;
      return(
          <div className={`UploaderTable-Default ${props.record.Select && 'sel'} ${props.record.Focus && 'focus'}`} 
            onClick={()=>{
                  this.setState({
                    // data:[...data, props.record]
                    data: data.map(
                      item => item.id === props.record.id ?
                        { ...item, ...{Select:!props.record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                          : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
                    ),
                  });
                  console.dir(props)
                }
              }
            >
              {props.value}
          </div>
      );
  }
  renderTracer = (props) => {
    const { data } = this.state;
      return(
        <div className={`UploaderTable-Default ${props.record.Select && 'sel'} ${props.record.Focus && 'focus'}`} 
            onClick={()=>{
                this.setState({
                  // data:[...data, props.record]
                  data: data.map(
                    item => props.record.id === item.id ?
                    { ...item, ...{Select:!props.record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                      : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
                  ),
                });
                console.dir(props)
              }
            }
          >
          <div className={`UploaderTable-Tracer ${props.value}`}>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;{props.value}</div>
          </div>
        </div>
      );
  }
  render() {
    const {data} = this.state;
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
          data={data}
          fields={fields}
          noRecordsMessage="There are no people to display"
          noFilteredRecordsMessage="No people match your filters!"
          pageSize={10}
      />
    );
  }
}