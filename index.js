class ImageLoader {
    constructor() {
        this._store = {};
        this._listeners = new Map();
    }
    on(label, callback) {
        this._listeners.has(label) || this._listeners.set(label, []);
        this._listeners.get(label).push(callback)
        this._listeners.get(label).filter(l => l!== callback);
    }
    emit(label, ...args) {  
        let listeners = this._listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args); 
            });
            return true;
        }
        return false;
    }
    isFunction (obj) {  
        return typeof obj == 'function' || false;
    };

    removeListener(label, callback) {  
        let listeners = this.listeners.get(label),
            index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i, listener, index) => {
                return (this.isFunction(listener) && listener === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }
    load(obj) {
        return new Promise((resolve,reject) => {
            let total = 0;
            let loaded = 0;
            Object.keys(obj).forEach(key => {
                total++;
                let img = new Image();
                img.src = obj[key]
                document.getElementById("myDiv").appendChild(img);
                img.onload = () => {
                    loaded++;
                    this._store[key] = img;
                    this.emit('progress', loaded, total);
                    if( loaded == total) {
                        resolve([loaded,total,'done']);
                    }
                };
                img.onerror = () => {
                    return null;
                };
            });
        })
    }
}

const myImages = {'pic1':'http://img2.imgtn.bdimg.com/it/u=3095110310,3312609328&fm=21&gp=0.jpg',
     'pic2':'http://img0.imgtn.bdimg.com/it/u=2244573937,655272329&fm=21&gp=0.jpg',
     'pic3':'http://img0.imgtn.bdimg.com/it/u=352428675,3577147449&fm=11&gp=0.jpg',
     'pic4':'http://img5.imgtn.bdimg.com/it/u=2304143327,730983870&fm=21&gp=0.jpg',
     'pic5':'http://img1.imgtn.bdimg.com/it/u=2256788338,1806496521&fm=21&gp=0.jpg',
     'pic6':'http://img2.imgtn.bdimg.com/it/u=3947059078,1115942990&fm=21&gp=0.jpg',
     'pic7':'http://img5.imgtn.bdimg.com/it/u=2288619459,320422424&fm=21&gp=0.jpg'
};
// const cb = (a) => { console.log('This is'+a+ 'callback and loading is sucessful'); };
let test = new ImageLoader();
test.load(myImages).then(function(a){
    console.log('hey, this is my ',a[2]);
});
const cb2 = (loaded, total) => { console.log(loaded,' of ', total,' are loaded'); };
test.on('progress',cb2);








