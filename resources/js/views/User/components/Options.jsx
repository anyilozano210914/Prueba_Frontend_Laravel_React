import React from 'react';
import { Fragment } from 'react';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Axios from 'axios';

class Options extends React.Component {

    constructor(props){
        super(props);
        var phone = 0
        this.props.data_edit.phones.map(item => {
            if(item.principal == 1){
                phone = item.phone
            }
        }),
        this.state = {
            modal: false,
            name: this.props.data_edit.name,
            last_name: this.props.data_edit.last_name,
            document: this.props.data_edit.document,
            password: this.props.data_edit.password,
            phones: this.props.data_edit.phones,
            email: this.props.data_edit.email,
            phone: phone,
            principal: null,
            id: this.props.data_edit.id
        }

        this.openModal = this.openModal.bind(this)
        this.handlerChange = this.handlerChange.bind(this)
        this.editDataUser = this.editDataUser.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    openModal(id, data = null){
        $('#editUser').modal('show');
    }

    handlerChange(event){
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value })
        console.log(this.state.name)
    }

    closeModal(){
        $('#editUser').modal('hide')
    }

    deleteItem(){
        Swal.fire({
            title: 'Eliminar Usuario',
            text: "Estas seguro de eliminar el usuario?, recuerda que es permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, eliminemoslo'
        }).then((result) => {
            if (result.value) {
                Axios.delete('api/user/deleteUser/'+this.props.data_edit.id)
                .then(res => {
                    if(res.data.transaction.status == true){
                        Swal.fire({
                            icon: 'success',
                            html: `Se elimino exitosamente la información del usuario <b>${ this.state.name + ' ' + this.state.last_name }</b>`
                        })
                        this.closeModal();
                        window.location.reload()
                    }else{
                        Swal.fire({
                            icon: 'error',
                            text: 'No se pudo eliminar el usuario',
                        })
                    }
                }).catch(err => {
                    console.log(err)
                    Swal.fire({
                        icon: 'error',
                        text: 'No se pudo eliminar el usuario',
                    })
                })
            }
        })
    }

    editDataUser(){
            let data = {
                id: this.state.id,
                name: this.state.name,
                last_name: this.state.last_name,
                document: this.state.document,
                email: this.state.email,
                phone: this.state.phone
            }
            Axios.post('api/user/editUser', data)
            .then(res => {
                if(res.data.transaction.status == true){
                    Swal.fire({
                        icon: 'success',
                        html: `Se edito exitosamente la información del usuario <b>${ this.state.name + ' ' + this.state.last_name }</b>`
                    })
                    this.closeModal();
                    window.location.reload()
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: 'No se pudo guardar la nueva informacion del usuario',
                    })
                }
            }).catch(err => {
                console.log(err)
                Swal.fire({
                    icon: 'error',
                    text: 'Tienes que ingresar el apellido del usuario'
                })
            })
    }

    render(){
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={ this.openModal }>&times;</button>;
        const modal = this.state.modal;
        const options = [
            {value: 1, label: 'Principal'},
            {value: 0, label: 'No Principal'}
        ]
        return(
            <Fragment>
                <Button outline className="options-button" color="primary" onClick={ this.openModal }>
                    <i className="fas fa-edit"></i>
                </Button>
                <div className="modal" id="editUser" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Usuario { this.props.data_edit.name + ' ' + this.props.data_edit.last_name }</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body row">
                                <div className="form-group col-md-6">
                                    <label>Nombres</label>
                                    <input type="text" name="name" value={ this.state.name } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellidos</label>
                                    <input type="text" name="last_name" value={ this.state.last_name } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Documento</label>
                                    <input type="number" name="document" value={ this.state.document } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Correo Electronico</label>
                                    <input type="text" name="email" value={ this.state.email } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Telefono</label>
                                    <input type="number" name="phone" value={ this.state.phone } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ this.closeModal }>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={ this.editDataUser }>Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Button outline className="options-button" color="danger" onClick={ this.deleteItem }>
                    <i className="fas fa-trash-alt"></i>
                </Button>
            </Fragment>
        );
    }
}

export default Options;