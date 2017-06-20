import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            data2:{}
        };
    },

    onGetData2(name) {
        const t = this;
        DB.Test.getData({
        	q:name
        }).then(function (data) {
            if(data){
                t.state.data2 = data;
            }
            t.updateComponent();
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});
