import { LitElement, html, css } from 'lit';

export class Whishlist  extends LitElement {

  static styles = css`
  div {
    background: linear-gradient(45deg, rgba(131,58,180,1) 28%, rgba(253,29,29,1) 65%, rgba(252,176,69,1) 100%);
    color:#fff;
  }
  h1, p, li {
    font-family: sans-serif;
    text-align: center;
    margin: auto;
  }
  legend {
    font-weight: bolder;
    font-family: sans-serif;
  }
  fieldset {
    width: 250px;
    margin: auto;
    background-color: #0000006a;
  }
  ul {
    margin: auto;
    width: 200px;
    list-style: none;
  }
  li {
    text-align: left;
    color: #ffffff;
    font-weight: bolder;
  } 
  button {
    margin-left: 46%;
    background-color: #e9e9e990;
    color: #ffffff;
    padding: 10px;
    font-weight: bolder;
    border: none;
  } 
  #newitem {
    width: 250px;
  }
  .completed {
    text-decoration-line: line-through;
    color: #bababa;
  }
  .verde {
    color: green;
  }
  .amarillo {
    color: yellow;
  }
  .rojo {
    color: red;
  }

`;

  static get properties() {
    return {
      listItems: {state: true},
      checked: {},
      color: { type: String },
      segundos: { type: Number }
    };
  }

  constructor() {
    super();
    this.addEventListener('keypress', this.addToDo);
    this.listItems = [ ],
    this.checked = false,
    this.color = 'verde',
    this.segundos = 0
    ;
  }

  render() {
    return html`
      <div>
      <br><br><br><h1>Mi Lista de Propositos</h1><br><br><br>
      <fieldset>
      <legend>Nuevo Proposito</legend>
      <br> 
      <input id="newitem" aria-label="New item" placeholder='Proposito...' click=${this.addToDo}>
      </fieldset><br>

      <ul>
         ${this.listItems.map((item) =>
          html`<li class=${item.completed ? 'completed' : this.color} @click=${() => this.toggleCompleted(item)}>
            <input type="checkbox" > ${item.text}
          </li>`
         )}
      </ul>
      <br><br><br> 
      <button @click=${this.reset}>Limpiar Lista</button>
      <br><br><br>
      </div>
    `;
  }

  toggleCompleted(item) {
    item.completed = !item.completed;
    this.requestUpdate(); // requestUpdate() = forzar un nuevo render
  }

  get input() {
    return this.renderRoot?.querySelector('#newitem') ?? null;
  }
  addToDo(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        this.listItems = [...this.listItems,
        { text: this.input.value }];
        this.input.value = '';
        this.temporizador();
      }
    }
  reset() {
    this.listItems = [];
      return this.listItems;
  }
    
  temporizador (){
      setTimeout(() => {
        this.color = '';
      }, 0);
      setTimeout(() => {
        this.color = 'verde';
      }, 4000);
        
      setTimeout(() => {
        this.color = 'amarillo';
      }, 7000);
        
      setTimeout(() => {
        this.color = 'rojo';
      }, 10000);   
  }
}
customElements.define('simple-component', Whishlist);