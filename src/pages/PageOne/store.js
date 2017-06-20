import { createStore } from 'reflux';
import Action from './action';
import DB from '../../db/db'

export default createStore({

    listenables: [Action],

    init() {
        this.state = {
            data:{}
        };
    },

    onGetData(name) {
        const t = this;
        DB.Test.getData({
        	q:name
        }).then(function (data) {
            if(data){
                t.state.data = data;
            }
            t.updateComponent();
        });
    },

    updateComponent() {
        this.trigger(this.state);
    }
});
