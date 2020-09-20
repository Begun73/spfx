import * as React from 'react';
import styles from './Edit.module.scss';
import { IEditProps } from './IEditProps';
import { escape } from '@microsoft/sp-lodash-subset';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css'
import { TextInput, Textarea, Button} from 'react-materialize';
import '../../../css/style.css?v=1';
import { sp } from "@pnp/sp/presets/all";
import {Ripple} from 'react-preloaders';

export default class Edit extends React.Component<IEditProps, {}> {
  getParameterByName = name => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  state={
    isLoading:true,
    item:null,
    id:this.getParameterByName("edit"),
    error:null,
    isSaving:false
  }
  onChangeValue = e =>{
    let item = this.state.item;
    item[e.target.id]=e.target.value;
    this.setState({item});
  }
  validation = () =>{
    let error = false;
    if (this.state.item.Title.length == 0 || this.state.item.Num.length == 0 || this.state.item.Description.length == 0){
      this.setState({error:true});
      return false;
    }else{
      return true;
    }
  }
  onSave = () =>{
    if (this.validation()){

    }
  }
  onAdd = () =>{
    if (this.validation()){

    }
  }
  componentDidMount = async () =>{
    M.AutoInit();
    if (this.state.id){
      
      try{
        const item = await sp.web.lists.getByTitle("Список").items.getById(+this.state.id).select("Title,Id,Description,Num").get();
        this.setState({item,isLoading:false});
      }catch{
        window.location.href="/"
      }
    }else{
      const item={
        Title:"",
        Num:"",
        Description:""
      }
      this.setState({item,isLoading:false});
    }
  }
  public render(): React.ReactElement<IEditProps> {
    return (
      this.state.isLoading ?
      <Ripple/>
      :
      <div className="edit_wrapper">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <TextInput error="Заполните обязательное поле" inputClassName={this.state.item.Title.length == 0 && this.state.error ? "invalid" : ""} id="Title" s={12} label="Название" defaultValue={this.state.item.Title} value={this.state.item.Title} onChange={(e)=>this.onChangeValue(e)}/>
              </div>
              <div className="input-field col s6">
                <TextInput error="Заполните обязательное поле" id="Num" inputClassName={this.state.item.Num.length == 0 && this.state.error ? "invalid" : ""} s={12} label="Код" defaultValue={this.state.item.Num} onChange={(e)=>this.onChangeValue(e)}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Textarea error="Заполните обязательное поле" id="Description" s={12} className={this.state.item.Description.length == 0 && this.state.error ? "invalid" : ""} label="Описание" defaultValue={this.state.item.Description} onChange={(e)=>this.onChangeValue(e)}/>
          </div>
        </div>
        <div className="row">
          <div className="col s12" style={{display:"flex",justifyContent:"center"}}>
            {this.state.id ?
              <Button className="button_wrapper_materialize" onClick={this.onSave}>
                Сохранить
              </Button> :
              <Button className="button_wrapper_materialize" onClick={this.onAdd}>
                Добавить
              </Button>}
          </div>
        </div>
      </div>
    );
  }
}
