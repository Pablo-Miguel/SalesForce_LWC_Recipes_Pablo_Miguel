import { LightningElement, api } from 'lwc';

export default class MyChildComponent extends LightningElement {
    
    // VARABLES
    @api task;

    // METHODS
    handleClick() {
        let { id } = this.task;
        console.log(`Removing task with id: ${id}`);

        this.dispatchEvent(new CustomEvent('remove', {
            detail: {
                taskId: id
            }
        }));
    } 

}