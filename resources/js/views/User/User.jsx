import React, { Component, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ServerTable from 'react-strap-table';

// Styles 
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// Components
import Options from './components/Options';
import CreateUser from './components/CreateUser';

class User extends Component {
    constructor(props){
        super(props);
        this.serverTable = React.createRef();
    }

    componentDidMount(){
        var title = document.getElementById('title');
        title.innerText = 'Usuarios - Prueba Web'
    }

    refreshData(){
        this.serverTable.current.refreshData()
    }

    render(){
        const columns = [
            'id',
            'name',
            'last_name',
            'document',
            'email',
            'phones',
            'opciones',
        ];

        const options = {
            headings: {
                id: 'Id',
                name: 'Nombres',
                last_name: 'Apellidos',
                document: 'Documento',
                email: 'Correo Electronico',
                phones: 'Telefonos',
            },
            sortable: [],
            responseAdapter: function (response) {  
                {return {data: response.data, total: response.total}}  
            },   
        }

        return(
            <Container className="body">
                <Col>
                    <CreateUser></CreateUser>
                </Col>
                <ServerTable 
                    url="http://127.0.0.1:8000/api/user/getUsers"
                    columns={ columns } 
                    options={ options }
                    ref={ this.serverTable }
                >
                    {
                        function(row, column){
                            switch(column){
                                case 'opciones':
                                    return(
                                        <Options data_edit={ row } parentCallback={ this.refreshData }></Options>
                                    );
                                case 'phones': 
                                    return(
                                        <div>
                                            <ul className="list_number">
                                                {
                                                    row.phones.map(item => 
                                                        item.principal == 1 ? 
                                                        <li key={ item.id }><b>{item.phone}  principal</b></li> :
                                                        <li>{item.phone}</li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    );
                                default:  
                                    return (row[column]);
                            }
                        }
                    }
                </ServerTable>
            </Container>
        );
    }
}

export default User;