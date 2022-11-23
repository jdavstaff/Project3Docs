// const { modalUnstyledClasses } = require("@mui/material")
import { url } from './global'
import axios from 'axios'

function translate(element) {
    let children = element.childNodes
    if(children.length == 0)
      return


    for(let i=0; i<children.length; i++) {
      if(children[i].data && children[i].nodeType === 3) {
        let options = {
          method: 'GET',
          url: `${url}/translate`,
          params: {
            text: children[i].data,
            target: "es"
          }
        }
        axios.request(options).then((res) => {
          children[i].data = res.data
        })
      }
      translate(children[i])
    }
  }

  export function translateComponents() {
    let root = document.querySelector('div')
    translate(root)
  }

