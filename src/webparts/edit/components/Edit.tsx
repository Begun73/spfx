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
  /**
   * Метод получения параметров url(работает во всех браузерах)
   * @param {string} name Название параметра
   */
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
  /**
   * Хендлер измения полей
   * @param {Object} e текущий элемент который изменяем
   */
  onChangeValue = e =>{
    let item = this.state.item;
    item[e.target.id]=e.target.value;
    this.setState({item});
  }
  /**
   * Валаидация полей
   */
  validation = () =>{
    let error = false;
    if (this.state.item.Title.length == 0 || this.state.item.Num.length == 0 || this.state.item.Description.length == 0){
      this.setState({error:true,isSaving:false});
      return false;
    }else{
      return true;
    }
  }
  /**
   * Метод сохранения текущего элемента
   */
  onSave = async () =>{
    this.setState({isSaving:true});
    if (this.validation()){
      try{
        await sp.web.lists.getByTitle("Список").items.getById(+this.state.id).update(this.state.item);
        window.location.href="/"
      }catch{
        this.setState({isSaving:false});
      }
    }
  }
  /**
   * Метод добавления элемента в список
   */
  onAdd = async () =>{
    this.setState({isSaving:true});
    if (this.validation()){
      try{
        await sp.web.lists.getByTitle("Список").items.add(this.state.item);
        window.location.href="/"
      }catch{
        this.setState({isSaving:false});
      }
    }
    
  }
  /**
   * Метод жищненного цикла реакт(тут асинхронщина должна быть)
   */
  componentDidMount = async () =>{
    M.AutoInit();
    //Если в url есть параметр id элемента из списка, получаем этот итем из списка. Иначе компонент работает на создание эелемента.
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
        {
          this.state.isSaving &&
          <div className="custom_saving">
            <Ripple/>
          </div>
        }
      </div>
    );
  }
}
