import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { Store } from '@ngrx/store';
// import {State} from "../../reducers";
import * as ConnectyCube from "ConnectyCube";
import { ConnserviceService } from './services/connservice.service';
//import {Store} from "@ngrx/store";
//import {State} from "../reducers";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'concubetest';
  @ViewChild('videoMe') videoMe!: ElementRef;
  roomId: string = "";
  selectedRoomId: string = "";
  myUserId: string = "";
  myDisplayName: string = "";
  msgReEvents:string=""
  myStream: any;
 
  
  //how to save and submit token automatically
  constructor(private conservice: ConnserviceService){
  
  }
  async ngOnInit(): Promise<void> {

  }

  async CreateSession() {
    const guestUserCredentials = { guest: '1', full_name: 'Awesome Smith' };
    //const userCredentials = { login: "cubeuser", password: "awesomepwd" };
    await ConnectyCube.createSession(guestUserCredentials)
      .then((session: any) => { })
      .catch((error: any) => { alert("Error when createSession" + error) });
  }
  async setUpConfig() {
    //const ConnectyCube = require("connectycube");

    const credentials = {
      appId: 7088,
      authKey: "dO6bWrjq79aaJsv",
      authSecret: "TwgAetEyGyJV6y4"
    }

    const MULTIPARTY_SERVER_ENDPOINT = 'wss://janus.connectycube.com:8989';

    const appConfig = {
      debug: { mode: 1 },
      conference: { server: MULTIPARTY_SERVER_ENDPOINT },
    }

    await ConnectyCube.init(credentials, appConfig);
    //alert ("ConnectyCube has been initialized");



  }

  async CreateMeeting() {

    const params = {
      name: (1011).toString(),
      // start_date: _start,
      // end_date: _end,
      // attendees: [
      //    //{id: 123, email: "..."},
      //   // {id: 124, email: "..."}
      //    {email: "renan@mypaglin.com"},
      //    {email: "alan@mypaglin.com"}
      // ],
      record: false,
      chat: false,
      public: true
    };

    ConnectyCube.meeting.create(params)
      .then((meeting: any) => {
        const confRoomId = meeting._id;
        this.roomId = confRoomId;
      })
      .catch((error: any) => {
        alert("ERROR Msg: " + error)
      });

  }

  async CreateApplicationSession() {
    ConnectyCube.createSession()
      .then((session: any) => { })
      .catch((error: any) => { });
  }
  async RetrieveSelectedRoomId() {
    const params = {
      _id: this.selectedRoomId,
    };
    ConnectyCube.meeting
      .get(params)
      .then((meeting: any) => {
        alert("Found selected room Id");
      })
      .catch((error: any) => { });
  }

  async RetrieveListOfMeetings() {
    const params = { limit: 5, offset: 0 };

    ConnectyCube.meeting
      .get(params)
      .then((meetings: any) => {
        alert("Number of meetings retrieved: " + meetings.length)
      })
      .catch((error: any) => { });
  }

  async DoAll() {
    await this.setUpConfig();
    await this.CreateSession();
    await this.CreateMeeting();
  }

  async StartMyStream() {

    //event handlers

    //Create a video session
    const session = ConnectyCube.videochatconference.createNewSession();

    //Attach my camera to the session
    const mediaParams = {
      audio: true,
      video: true,
    };

    await session
      .getUserMedia(mediaParams)
      .then((localStream: any) => {
        this.myStream = localStream;
        //this.videoMe.nativeElement.srcObject = localStream;
        //this.videoMe.nativeElement.muted = true;
      })
      .catch((error: any) => { });

    //attach to video element
    session.attachMediaStream("myVideo", this.myStream, {
      muted: true,
      mirror: true,
    });

    //Join Room
    await session
      .join(this.selectedRoomId, this.myUserId, this.myDisplayName)
      .then((res:any) => {
        console.log("RESPONSE: "+res);
        //event listeners
        
      }) 
      .catch((error: any) => { });

    //const confRoomId = await session.currentRoomId;
    //alert("Current room id:" +  confRoomId);

    this.conservice.init();
  }


  public AssignRoomId() {
    this.roomId = document.getElementById("roomId")?.innerText!;
    alert("RoomId is: " + this.roomId);
  }
}

