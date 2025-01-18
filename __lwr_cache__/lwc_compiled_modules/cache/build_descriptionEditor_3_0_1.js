import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./descriptionEditor.html";
class DescriptionEditor extends LightningElement {
  constructor(...args) {
    super(...args);
    this.editBuild = true;
    this.description = '';
  }
  get buttonLabel() {
    return this.editBuild ? 'Preview' : 'Edit';
  }
  toggleEdit(event) {
    this.editBuild = !this.editBuild;
  }
  handleChange(event) {
    this.description = event.target.value;
    this.dispatchEvent(new CustomEvent('descriptionset', {
      detail: this.description
    }));
  }
}
_registerDecorators(DescriptionEditor, {
  publicProps: {
    description: {
      config: 0
    }
  },
  fields: ["editBuild"]
});
export default _registerComponent(DescriptionEditor, {
  tmpl: _tmpl
});