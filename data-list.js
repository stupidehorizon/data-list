(() => {
   
  const template = document.createElement('template');
  template.innerHTML = `
  <style>
  :host(*) {
    cursor: text;
    display: inline-block;
  }
  
  *, ::slotted(*) {
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 1em;
    line-height: 1.3em;
    font-family: sans-serif;
  }
  
  #display {
    position: relative;
  }
  
  #input {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: #fff8;
    padding: .5em;
  }
  
  #input:focus {
    border-color: #40a9ff;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
  
  #list {
    position: absolute;
    z-index: 99999;
    width: 100%;
    max-height: 200px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #fff;
    border: 1px solid #8888;
    opacity: 0;
    visibility: collapse;
  }
  
  .focus #list {
    opacity: 1;
    visibility: visible;
  }

  ::slotted(option) {
    padding: .5em;
    cursor: pointer;
    border-bottom: 1px solid #8882;
  }

  
  ::slotted(option:hover) {
    background-color: #f5850d;
  }

  ::slotted(option.hide) {
    display: none;
  }
  </style>
  <div id="display">
    <input id="input" type="text" autocomplete="false">
    <div id="list">
      <slot></slot>
    </div>
  </div>
  `;

  customElements.define(
      'data-list',
      class extends HTMLElement {
        constructor() {
          super();
          // 创建 DOM 结构
          const shadowRoot = this.attachShadow({ mode: 'open' });
          shadowRoot.appendChild(template.content.cloneNode(true));
          // 绑定事件
          this.addEventListener('blur', this.blur.bind(this));
          this.addEventListener('click', this.click.bind(this));
          this.dom('input').addEventListener('change', this.change.bind(this));
          this.dom('input').addEventListener('input', this.change.bind(this));
          this.dom('input').addEventListener('focus', this.focus.bind(this));
      }


      async connectedCallback() {
        const src = this.getAttribute('src');
        if(src) {
          /**
           * 请求异步数据
           * const data = await fetch('http://xxx');
           */

          const data = [
            {value: '1111', title: '异步数据１'},
            {value: '2222', title: '异步数据２'},
           ]

          const nodeArr = data.reduce((pre, cur) => {
            const dom = `<option value="${cur.value}">${cur.title}</option>`;
            pre.push(dom);
            return pre;
          }, []);
          console.log(this);
          this.innerHTML = nodeArr.join('');
        }
      }

      get placeholder() {
          return (
            this.getAttribute('placeholder') &&
            this.dom('input').getAttribute('placeholder')
          );
        }
  
      set placeholder(val) {
        this.setAttribute('placeholder', val);
        this.dom('input').setAttribute('placeholder', val);
      }

      get value() {
        const value = this.dom('input')
          .value.trim()
          .toLowerCase();
        const options = this.querySelectorAll('option');
        for (const opt of options) {
          const val = opt.value.trim().toLowerCase();
          if (val === value) {
            return val;
          }
        }
        return  value;
      }

      set value(val) {
        this.dom('input').value = ('' + val).trim(); // 强制转字符串
        this.change();
      }


      attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
          return;
        }
        switch (name) {
          case 'placeholder':
            this.dom('input').setAttribute('placeholder', newValue);
            break;
          case 'valid':
            this.blur();
            break;
          default:
            break;
        }
      }

      blur() {
        this.dom('display').classList.remove('focus');
      }

      change() {
        const value = this.dom('input').value.trim().toLowerCase();
        const options = this.querySelectorAll('option');
        // 寻找匹配节点
        for (const opt of options) {
          const val = opt.value.trim().toLowerCase();

          if (val.includes(value)) {
            opt.classList.remove('hide');
          } else {
            opt.classList.add('hide');
          }
        }
        this.setAttribute('value', value);
      }

      click(e) {
        if (e.target.tagName === 'OPTION') {
          this.dom('input').value = e.target.value;
          this.change();
        }
      }

      dom(id) {
        return this.shadowRoot.getElementById(id);
      }

      focus() {
        this.dom('display').classList.add('focus');
        this.dom('input').focus();
      }
    }
  );
})();