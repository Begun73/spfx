
import * as React from 'react';
import '../../../css/style.css?v=2';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as cap from "./images/cap.png";
import { IViewProps } from './IViewProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";
import {Ripple} from 'react-preloaders';

export default class View extends React.Component<IViewProps, {}> {
  state = {
    isLoading:true,
    list:[],
    error:null
  }
  openItem = id =>{
    window.open("/SitePages/Edit-Add-page.aspx?edit="+id, "_blank");
  }
  addItem = () =>{
    window.open("/SitePages/Edit-Add-page.aspx", "_blank");
  }
  getItem = (item,key) =>{
    return (
      <div className="col-sm-3 card_wrapper">
        <div className="card" key={key+"item"} onClick={()=>this.openItem(item.Id)}>
            <img className="card-img-top" src={cap} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">{item.Title}</h5>
              <i className="num">Код: {item.Num}</i>
              {item.Description && <p className="card-text">{item.Description.length>90 ? item.Description.slice(0, 90) + ' ...' : item.Description}</p>}
            </div>
        </div>
      </div>  
    )
    
  }
  componentDidMount = async () =>{
    try{
      var list = await sp.web.lists.getByTitle("Список").items.getAll();
      list && this.setState({list,isLoading:false});
      console.log(list);
    }catch{
      this.setState({error:"Ошибка получения списка",isLoading:false});
    }
  }
  public render(): React.ReactElement<IViewProps> {
    const error = this.state.error && <span style={{color:"red"}}>{this.state.error}</span>;
   
    
    return (
      this.state.isLoading ?
      <Ripple/>
      :
      <div className="view_wrapper">
        <div className="button_wrapper">
          <button type="button" className="btn btn-primary btn-lg" onClick={this.addItem}>Добавить эллемент</button>
        </div>
        <div className="list">
          <div className="row">
            {this.state.list.map((item,key)=>this.getItem(item,key))}
          </div>
        </div>
      </div>
    );
  }
}
