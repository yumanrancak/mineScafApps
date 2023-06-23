import moment from 'moment';
import './footer.html';

Template.footer.helpers({
    currentYear: ()=>{
        return moment().format('YYYY')
    }
})