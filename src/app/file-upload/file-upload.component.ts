import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  fileForFirstPic: any[] = [];
  fileForSecondPic: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event: any[], whichOne: string) {
    this.prepareFilesList($event, whichOne);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any[], whichOne: string) {
    
    switch ( whichOne ) {
      case "FirstPic":
        this.prepareFilesList(files, whichOne);
          break;
      case "SecondPic":
        this.prepareFilesList(files, whichOne);
          break;
      default: 
          // 
          break;
   }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number, whichOne: string) {

    switch ( whichOne ) {
      case "FirstPic":
        if (this.fileForFirstPic[index].progress < 100) {
          console.log("Upload in progress.");
          return;
        }
        this.fileForFirstPic.splice(index, 1);
          break;
      case "SecondPic":
        if (this.fileForSecondPic[index].progress < 100) {
          console.log("Upload in progress.");
          return;
        }
        this.fileForSecondPic.splice(index, 1);
          break;
      default: 
          // 
          break;
   }
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number, whichOne: string) {
    setTimeout(() => {

      switch ( whichOne ) {
        case "FirstPic":
          if (index === this.fileForFirstPic.length) {
            return;
          } else {
            const progressInterval = setInterval(() => {
              if (this.fileForFirstPic[index].progress === 100) {
                clearInterval(progressInterval);
                this.uploadFilesSimulator(index + 1, whichOne);
              } else {
                this.fileForFirstPic[index].progress += 5;
              }
            }, 200);
          }
            break;
        case "SecondPic":
          if (index === this.fileForSecondPic.length) {
            return;
          } else {
            const progressInterval = setInterval(() => {
              if (this.fileForSecondPic[index].progress === 100) {
                clearInterval(progressInterval);
                this.uploadFilesSimulator(index + 1, whichOne);
              } else {
                this.fileForSecondPic[index].progress += 5;
              }
            }, 200);
          }
            break;
        default: 
            // 
            break;
     }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>, whichOne: string) {

    switch ( whichOne ) {
      case "FirstPic":
        for (const item of files) {
          item.progress = 0;
          this.fileForFirstPic.push(item);
        }
        this.fileDropEl.nativeElement.value = "";
        this.uploadFilesSimulator(0, whichOne);
          break;
      case "SecondPic":
        for (const item of files) {
          item.progress = 0;
          this.fileForSecondPic.push(item);
        }
        this.fileDropEl.nativeElement.value = "";
        this.uploadFilesSimulator(0, whichOne);
          break;
      default: 
          // 
          break;
   }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
