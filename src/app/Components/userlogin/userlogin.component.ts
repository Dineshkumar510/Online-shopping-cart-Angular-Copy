import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {

  requirements: { regex: RegExp, message: string, isValid: boolean }[] = [
    { regex: /.{8}/, message: 'Password must be at least 8 characters long.', isValid: false },
    { regex: /[0-9]/, message: 'At least one number (0...9) is required.', isValid: false },
    { regex: /[a-z]/, message: 'At least one lowercase letter (a...z) is required.', isValid: false },
    { regex: /[A-Z]/, message: 'At least one uppercase letter (A...Z) is required.', isValid: false },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'At least one special character (!...$) is required.', isValid: false },
  ];

  login: boolean = false;
  email:any;
  passwordValue: string = '';
  confirmPassword:any;
  password:any;
  show:boolean = false;
  validRequirements: boolean[] = [false, false, false, false, false];

  constructor() {}

  ngOnInit(): void {
    this.password = 'password';
    const passwordInput: HTMLInputElement | null = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.addEventListener('input', () => {
        this.checkPasswordRequirements();
        this.updateRequirementsUI(this.requirements);
      });
    }
  }

  onPasswordInput() {
    this.checkPasswordRequirements();
    this.updateRequirementsUI(this.requirements);
  }

  private checkPasswordRequirements() {
    this.passwordValue = this.passwordValue.trim();
    this.requirements.forEach(requirement => {
      requirement.isValid = requirement.regex.test(this.passwordValue);
    });
  }

  isRequirementValid(requirement: { regex: RegExp, message: string, isValid: boolean }): boolean {
    return requirement.isValid;
  }

  toggle() {
    this.login = !this.login;
  }

  updateRequirementsUI(requirements: { regex: RegExp, message: string, isValid: boolean }[]) {
    const passwordMessage = document.getElementById('password-message');
    if (passwordMessage) {
      requirements.forEach((requirement, index) => {
        const requirementItem = passwordMessage.children[index] as HTMLElement;

        if (requirementItem) {
          if (requirement.isValid) {
            this.validRequirements[index] = true;
            requirementItem.classList.remove("invalid");
            requirementItem.classList.add("valid");
          } else {
            this.validRequirements[index] = false;
            requirementItem.classList.remove("valid");
            requirementItem.classList.add("invalid");
          }
        }
      });
    }
  }


  SignUpSubmit(form:NgForm){
    if(!form.valid){
      return;
    } else{
      const email = form.value.email;
      const password = form.value.password;
      const CnfPassword = form.value.confirmPassword;
      // this.auth.Login(email, password).subscribe(data => {
      //   console.log(data);
      // }, errorMessage => {
      //   console.log(errorMessage);
      // });
      console.log(form.value);
      form.reset();
      window.location.reload();
    }
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

}
