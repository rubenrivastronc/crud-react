import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  { id: 1, nombre: "Antonio", rol:"Editor"},
  { id: 2, nombre: "Manuel", rol:"Redactor"},
  { id: 3, nombre: "Rafael", rol:"Atencion al cliente"},
  { id: 4, nombre: "Damian", rol:"Limpiador"},
  { id: 5, nombre: "Carlos", rol:"Director"},
  { id: 6, nombre: "Jesus", rol:"Gestor"}
];

class App extends React.Component {
  
  state = {  //Almacenar los datos que nos llegan en la variable data (mediante su state), form y modalInsertar
    data: data,
    form:{
      id:'',
      nombre:'',
      rol:''
    },
    modalInsertar: false,
    modalEditar: false,
    };
  

  handleChange=e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({data:lista, modalInsertar:false});
  }

  editar=(dato)=>{
    var cont = 0;
    var lista = this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[cont].nombre = dato.nombre;
        lista[cont].rol = dato.rol;
      }
      cont++;
    });
    this.setState({data:lista, modalEditar:false});
  }

  eliminar=(dato)=>{
    var opcion=window.confirm("Desea eliminar el registro " + dato.id + " ?");
    if(opcion){
      var cont=0;
      var lista = this.state.data;
      lista.map((registro)=>{
         if(registro.id==dato.id){
           lista.splice(cont,1);
         }
         cont++;
      });
      this.setState({data:lista});
    }
  }

  render(){
    return(
      <>
      <Container>
      <Button color="success mt-3 mb-3" onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo empleado</Button>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
          {this.state.data.map((elemento)=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.nombre}</td>
              <td>{elemento.rol}</td>
              <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>
              <Button color="danger mx-2" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      </Container>

      <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
              <div>
                <h3>Insertar registro</h3>
              </div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
            </FormGroup>
            <FormGroup>
              <label>Rol:</label>
              <input className="form-control" type="text" name="rol" onChange={this.handleChange}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
          <Button color="primery" onClick={()=>this.insertar()}>Insertar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
              <div>
                <h3>Editar registro</h3>
              </div>
          </ModalHeader>
          
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className="form-control" readOnly type="text" value={this.state.form.id}/>
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
            </FormGroup>
            <FormGroup>
              <label>Rol:</label>
              <input className="form-control" type="text" name="rol" onChange={this.handleChange} value={this.state.form.rol}/>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
          <Button color="primery" onClick={()=>this.editar(this.state.form)}>Editar</Button>
          <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>

        </Modal>
      
        </>
    ); 
  } 
}

export default App;
