import { Component, effect, ElementRef, viewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { MessageService } from '../../domain/message-service';
import { AccountService } from '../../domain/account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  readonly formGroup: FormGroup;
  aliasInputRefs = viewChildren<ElementRef>('aliasInputRef');

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router
  ) {
    // ReactiveForms erfodern explizites Form-Model,
    // was dem Datenmodell (User) entspricht
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: ['', Validators.pattern(/^\d{5}$/)],
      }),
      aliases: this.formBuilder.array(['']),
    });

    // https://angular.dev/guide/signals#effects
    effect(() =>
      // VORSICHT! Wird bei jeder Aenderung ausgefuehrt
      this.focusLastAlias()
    );
  }

  get aliases() {
    return this.formGroup.get('aliases') as FormArray;
  }

  addAlias() {
    const alias = this.formBuilder.control('');
    this.aliases.push(alias);

    // Kann so nicht funktionieren, weil das Element noch nicht existiert
    // und erst beim naechsten Zyklus gezeichnet wird
    // this.focusLastAlias();

    // HACK bzw. Workaround (weil zone.js unter der Haube mit setTimout arbeitet)
    // Bitte nicht zu Hause nachmachen!
    // setTimeout(() => this.focusLastAlias());
  }

  private focusLastAlias() {
    const refs = this.aliasInputRefs();
    if (refs.length) {
      refs[refs.length - 1].nativeElement.focus();
    }
  }

  removeAlias(i: number) {
    this.aliases.removeAt(i);
  }

  submit() {
    const user = this.formGroup.value as User;

    this.messageService.addMessage(`${user.username} hat sich registriert!`);

    this.accountService.register(user);
    this.router.navigate(['/']);
  }
}
