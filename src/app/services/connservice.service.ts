import { Injectable } from '@angular/core';
import * as ConnectyCube from "ConnectyCube";

@Injectable({
  providedIn: 'root'
})
export class ConnserviceService {

  public init(){
    //const ConnectyCube = require("connectycube");
      //event listeners
      ConnectyCube.videochatconference.onParticipantJoinedListener = (
        session:any,userId:any,userDisplayName:any,isExistingParticipant:any
      ) => {
        console.log("ONPARTICIPANTJOINEDLISTENER TRIGERRED");
        //this.msgReEvents="ONPARTICIPANTJOINEDLISTENER TRIGERRED";
      };
      ConnectyCube.videochatconference.onParticipantLeftListener = (session:any, userId:any) => {};
      
      ConnectyCube.videochatconference.onRemoteStreamListener  = (session:any, userId:any, stream:any) => {
        console.log(userId + " HAS JOINED THE ROOM!!!");
        //this.msgReEvents=userId + " HAS JOINED THE ROOM!!!";
      };

    ConnectyCube.videochatconference.onSlowLinkListener = (session:any, userId:any, uplink:any, nacks:any) => {};
    ConnectyCube.videochatconference.onRemoteConnectionStateChangedListener = (session:any, userId:any, iceState:any) => {};
    ConnectyCube.videochatconference.onSessionConnectionStateChangedListener = (session:any, iceState: any) => {};
    ConnectyCube.videochatconference.onErrorListener = (session: any, error: any) => {};
  }
}
