#!/bin/bash

function hdb_host {
  export $TOM=$1
}

function hdb_set {
 curl -X POST $TOM -d "$1=$2"
}

function hdb_get {
  curl "$TOM?key=$1"  
}

function hdb_del {
  curl -X DELETE "$TOM?key=$1"
}
