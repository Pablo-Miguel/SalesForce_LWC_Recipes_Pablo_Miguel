import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Toast from 'lightning/toast';
import Id from "@salesforce/user/Id";
import getCurrentUser from '@salesforce/apex/UserService.getCurrentUser';
import updateAccountNameById from '@salesforce/apex/AccountService.updateAccountNameById';

export default class MyComponent extends LightningElement {
    // VARIABLES
    @api recordId;
    @track _title;
    @track _tasks = [];
    @track _currentTask;
    @track _currentAccountName;
    @track _currentUserName;

    get transformedTasks () {
        return JSON.stringify(this._tasks);
    }

    // METHODS
    @wire(getRecord, { recordId: "$recordId", fields: ["Account.Name"] })
    manageAccount({ error, data }) {
        if (data) {
            this._currentAccountName = data.fields.Name.value;
        } else if (error) {
            console.error(error);
        }
    }

    @wire(getCurrentUser, { userId: Id })
    manageCurrentUser({ error, data }) {
        if (data) {
            this._currentUserName = data.Name;
            this._title = `TO-DO: ${this._currentUserName}`;
        } else if (error) {
            console.error(error);
        }
    }

    handleAccount() {
        updateAccountNameById({ accountId: this.recordId, newName: this._currentUserName })
        .then((result) => {
            this._currentAccountName = result.Name;
            console.log('Account name updated');
        })
        .catch(error => {
            console.error('Error updating account name');
            console.error(error);
        });
    }

    connectedCallback() {
        this._tasks.push({
            id: Date.now(),
            title: 'Predefined task'
        });
    }

    handleInputChange(event) {
        this._currentTask = event.target.value;
    }

    handleClick() {
        this.addTask(this._currentTask);
        this._currentTask = '';
    }

    handleRemoveTask(event) {
        let { taskId } = event.detail;

        this._tasks = this._tasks.filter(task => task.id !== taskId);
    }

    addTask(newTask) {
        if(!newTask) {
            this.showToast({
                label: 'ERROR: Empty task',
                message: 'Task cannot be empty',
                variant: 'error'
            
            });
        } else {
            this._tasks = [
                ...this._tasks, 
                {
                    id: Date.now(),
                    title: newTask
                }
            ];
    
            console.log(`Task --> ${this._currentTask}`);
            console.log(`Array -> ${this.transformedTasks}`);
        }
    }

    showToast(toastConfig) {
        let { label, message, variant } = toastConfig;

        Toast.show({
            label: label,
            message: message,
            variant: variant
        }, this);
    }
}