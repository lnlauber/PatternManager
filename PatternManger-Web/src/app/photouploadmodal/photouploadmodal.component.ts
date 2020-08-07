import { AlertifyService } from './../../_services/Alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Photo } from './../../models/photo';
import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Pattern } from 'src/models/pattern';

@Component({
  selector: 'app-photouploadmodal',
  templateUrl: './photouploadmodal.component.html',
  styleUrls: ['./photouploadmodal.component.scss']
})
export class PhotouploadmodalComponent implements OnInit {

  @Input() patternPhoto: boolean;
  @Input() profilePhoto: boolean;
  @Input() pattern: Pattern;
  @Output() succeeded = new EventEmitter();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user = this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
  model: Photo = null;

  constructor(private jwtHelper: JwtHelperService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    if (this.pattern?.id == undefined){
      this.model = {
        url: '',
        description: '',
        isPattern: this.patternPhoto,
        isProfile: this.profilePhoto,
        username: this.user,
      };
    }
    else{
      this.model = {
        url: '',
        description: '',
        isPattern: this.patternPhoto,
        isProfile: this.profilePhoto,
        patternId: this.pattern?.id,
        username: this.user,
      };
    }
    console.log(this.patternPhoto);
    console.log(this.pattern);
    console.log(this.pattern?.id);
    console.log(this.profilePhoto);
    console.log(this.model);

    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'api/AddPhoto',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      additionalParameter: this.model,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: false,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (file, response, status, headers) => {
      this.succeeded.emit();
      this.alertify.success('Photo upload successful.');
    };
  }


}

