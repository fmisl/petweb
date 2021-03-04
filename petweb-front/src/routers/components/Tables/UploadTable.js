import React, { PureComponent } from 'react';
import './UploadTable.css'

const FilterableTable = require('react-filterable-table');
 
// Data for the table to display; can be anything
const data = [
    { Select:true, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "FBB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "FBB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:true, Tracer: "FBP", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:true, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15"  },
    { Select:true, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15"  },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15" },
    { Select:false, Tracer: "C-PIB", SUVR: 2, PatientName: "Sandwich Eater", PatientID: "Sandwich Eater", Age: 45, Sex:"M", Update:"20.07.15"  },
];
 
const renderSelect = (props) => {
    return(
        <div className={`UploadTable-Select ${props.value && 'act'}`}>
            <div></div>
        </div>
    );
}
const renderTracer = (props) => {
    return(
        <div className={`UploadTable-Tracer ${props.value}`}>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.value}</div>
        </div>
    );
}
// Fields to show in the table, and what object properties in the data they bind to
const fields = [
    { render: renderSelect, name: 'Select', displayName: "", inputFilterable: true, sortable: true},
    { render: renderTracer, name: 'Tracer', displayName: "Tracer", inputFilterable: true, sortable: true },
    { name: 'SUVR', displayName: "SUVR", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'PatientName', displayName: "PatientName", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'PatientID', displayName: "PatientID", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'Age', displayName: "Age", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'Sex', displayName: "Sex", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'Update', displayName: "Update", inputFilterable: true, exactFilterable: true, sortable: true },
];
 
export default class UploadTable extends PureComponent {
    render() {
      return (
        <FilterableTable
            namespace="People"
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