import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelector('#width'),
          windowHeight = document.querySelector('#height'),
          windowType = document.querySelector('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');
          
    checkNumInputs('#width');
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) {
        if (elem instanceof NodeList || Array.isArray(elem)) {
            elem.forEach((item, i) => {
                item.addEventListener(event, () => {
                    switch(item.nodeName) {
                        case 'SPAN' : 
                                state[prop] = i;
                                break;
                        case 'INPUT' : 
                                if(item.getAttribute('type') === 'checkbox') {
                                    i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое';
                                    elem.forEach((box, j) => {
                                        box.checked = false;
                                        if(i == j) {
                                            box.checked = true;
                                        }
                                    })
                                } else {
                                    state[prop] = item.value;
                                }
                                break;
                        case 'SELECT' : 
                                state[prop] = item.value;
                                break;
                    }

                    console.log(state);
                });
            });
        } else if (elem instanceof Element) {
            elem.addEventListener(event, () => {
                state[prop] = elem.value;
                console.log(state);
            });
        } else {
            console.error("bindActionToElems: Invalid element type");
        }
    }
    
    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeight, 'height'); 
    bindActionToElems('input', windowWidth, 'width'); 
    bindActionToElems('change', windowType, 'type');  
    bindActionToElems('change', windowProfile, 'profile');  
};
export default changeModalState;
