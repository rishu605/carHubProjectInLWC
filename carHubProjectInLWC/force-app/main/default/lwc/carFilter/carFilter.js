import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
const CATEGORY_ERROR = 'Error Loading Categories'
const MAKE_ERROR = 'Error Loading Make'
export default class CarFilter extends LightningElement {

    categoryError = CATEGORY_ERROR
    makeError = MAKE_ERROR
    filters = {
        searchKey:'',
        maxPrice:999999
    }

    // Fetching Category Picklist
    @wire(getObjectInfo, {objectApiName:CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues, {
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        filedApiName: CATEGORY_FIELD
    })categories

    @wire(getPicklistValues, {
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        filedApiName: MAKE_FIELD
    })makeType
    
    handleSearchKeyChange(event) {
        console.log(event.target.value)
        this.filters = {...this.filters, 'searchKey':event.target.value}
    }

    handleMaxPriceChange(event) {
        console.log(event.target.value)
        this.filters = {...this.filters, 'maxPrice':event.target.value}
    }

    handleCheckbox(event) {
        const {name, value} = event.target.dataset
        console.log("name", name)
        console.log("value", value)
    }
}