import React from "react";
import Realm from "realm";
import {createRealmContext} from "@realm/react"

class Users extends Realm.Object{
    static schema ={
        name:"Users",
        properties:{
            _id:"objectID",
            fname:'string',
            lname:'string',
            email:'string',
            password:'string',
        },
        primaryKey:'_id'
    }
}
const realmConfig = {
  schema: [Users],
};
export const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);
