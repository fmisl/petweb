import React, { Component } from 'react'
import IconDelete from '../../../images/IconDelete';
import './AnalysisItem2.css'

const FilterableTable = require('react-filterable-table');

const subRegionName = [
  'Composite',
  'Frontal_L',
  'Frontal_R',
  'Parietal_L', 
  'Parietal_R', 
  'Temporal_L', 
  'Temporal_R',
  'Cingulate_L', 
  'Cingulate_R', 
  'Striatum_L', 
  'Striatum_R', 
  'Occipital_L', 
  'Occipital_R', 
  'Thalamus_L', 
  'Thalamus_R', 
]

export default class AnalysisItem2 extends Component {
  constructor(props) {
    super(props);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderClick = this.renderClick.bind(this);
    this.renderCentiloid = this.renderCentiloid.bind(this);
    this.state = {
      data: subRegionName.map((v,i)=>{return {id:i, Focus:false, Select: false, SubRegion:v, SUVR:this.props.subRegion[v], Centiloid:this.props.subRegion[v+'_C']}}),
      // data: [
      //   { id:0, Focus:false, Select: true, SubRegion:"Composite",              SUVR: 0.85, Centiloid: 60.8},
      //   { id:1, Focus:false, Select: true, SubRegion:"Prefrontal R",           SUVR: 0.55, Centiloid: 46.8},
      //   { id:2, Focus:false, Select: true, SubRegion:"Prefrontal L",           SUVR: 0.33, Centiloid: 75.8},
      //   { id:3, Focus:false, Select: true, SubRegion:"Anterior Cingulate R",   SUVR: 0.93, Centiloid: 44.8},
      //   { id:4, Focus:false, Select: true, SubRegion:"Anterior Cingulate L",   SUVR: 0.93, Centiloid: 45.8},

      //   { id:5, Focus:false, Select: false, SubRegion:"Precuneous R",           SUVR: 0.92, Centiloid: 64.8},
      //   { id:6, Focus:false, Select: false,  SubRegion:"Precuneous L",           SUVR: 1.22, Centiloid: 45.8},
      //   { id:7, Focus:false, Select: false, SubRegion:"Temporal Lateral R",     SUVR: 0.92, Centiloid: 56.8},
      //   { id:8, Focus:false, Select: false, SubRegion:"Temporal Lateral L",     SUVR: 1.84, Centiloid: 77.8},
      //   { id:9, Focus:false, Select: false, SubRegion:"Occipital R",            SUVR: 1.66, Centiloid: 76.8},

      //   { id:10, Focus:false, Select: false, SubRegion:"Occipital L",           SUVR: 1.44, Centiloid: 56.8},
      //   { id:11, Focus:false, Select: false,  SubRegion:"Sensorimotor R",        SUVR: 1.32, Centiloid: 66.8},
      //   { id:12, Focus:false, Select: false, SubRegion:"Sensorimotor L",        SUVR: 1.50, Centiloid: 86.8},
      //   { id:13, Focus:false, Select: false, SubRegion:"Temporal Medial R",     SUVR: 1.50, Centiloid: 23.8},
      //   { id:14, Focus:false, Select: false, SubRegion:"Tmeporal Medial L",     SUVR: 1.50, Centiloid: 54.8},

      //   { id:15, Focus:false, Select: false, SubRegion:"Cerebellum Grey",       SUVR: 1.23, Centiloid: 34.8},
      //   { id:16, Focus:false, Select: false,  SubRegion:"Cerebellum Whole",      SUVR: 0.91, Centiloid: 44.8},
      //   { id:17, Focus:false, Select: false, SubRegion:"Pons",                  SUVR: 0.81, Centiloid: 20.8},
      // ],
    };
  }
  componentDidUpdate(prevProps){
    console.log('componentDidUpdate in analysis2')
    if (prevProps.subRegion !== this.props.subRegion){
      const data=subRegionName.map((v,i)=>{return {id:i, Focus:false, Select: false, SubRegion:v, SUVR:this.props.subRegion[v], Centiloid:this.props.subRegion[v+'_C']}});
      this.setState({
        data,
      })
      console.log(data)
    }
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
          <div  className={`AnalysisItem2Table-Default ${props.record.Select && 'sel'}`}
                      onClick={()=>{
                          this.setState({
                              // data:[...data, props.record]
                                  data: data.map(
                                  item => props.record.id === item.id ?
                                  { ...item, ...{Select:!props.record.Select, Focus:true} } // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
                                    : {...item,...{Focus:false}} // 기존의 값을 그대로 유지
                              ),
                          });
                      }
                  }
              >
              <div className={`AnalysisItem2Table-SUVR`}>
                  <span>{Number(props.value).toFixed(2)}</span>
                  {/* <progress value={props.value} min={0} max={5} /> */}
                  <div style={{width: "100px", height:"5px", borderRadius:"5px",
                  boxSizing:"border-box", background:"#91919C"}}>
                      <div style={styleDiv}></div>
                  </div>
              </div>
          </div>
      );
  }
  renderSelect = (props) => {
      const {data} = this.state;
      return(
          <div className={`AnalysisItem2Table-Default ${props.record.Select && 'sel'}`} 
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
              <div className={`AnalysisItem2Table-Select ${props.value && 'act'}`} >
                  <div></div>
              </div>
          </div>
      );
  }
  renderClick = (props) => {
    const { data } = this.state;
      return(
          <div className={`AnalysisItem2Table-Default ${props.record.Select && 'sel'} ${props.record.Focus && 'focus'}`} 
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
  render() {
    const {data} = this.state;
    const fields = [
      { render: this.renderSelect, name: 'Select', displayName: "", inputFilterable: true, sortable: true },
      { render: this.renderClick, name: 'SubRegion', displayName: "SubRegion", inputFilterable: true, exactFilterable: false, sortable: true },
      { render: this.renderClick, name: 'SUVR', displayName: "SUVR", inputFilterable: true, exactFilterable: false, sortable: true },
      { render: this.renderCentiloid, name: 'Centiloid', displayName: "Centiloid", inputFilterable: true, exactFilterable: false, sortable: true },
    ];
    return (
      <FilterableTable
          className="AnalysisItem2Table"
          tableClassName="AnalysisItem2Table"
          // trClassName="WorklistTable"
          namespace="AnalysisItem2Table"
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