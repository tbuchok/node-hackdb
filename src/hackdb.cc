#include "./hackdb/core.h"
#include <node.h>
#include <cstring>
#include <v8.h>

using namespace v8;

hdb_t *db = hdb_create();

char *get(v8::Local<v8::Value> value, const char *fallback = "") {
 if (value->IsString()) {
   v8::String::AsciiValue string(value);
   char *str = (char *) malloc(string.length() + 1);
   strcpy(str, *string);
   return str;
 }
 char *str = (char *) malloc(strlen(fallback) + 1);
 strcpy(str, fallback);
 return str;
}

Handle<Value> Set(const Arguments& args) {
  HandleScope scope;
  char *key = get(args[0], "");
  char *value = get(args[1], "");
  hdb_set(db, key, value);
  return scope.Close(String::New(key));
}

Handle<Value> Get(const Arguments& args) {
  HandleScope scope;
  char *key = get(args[0], "");
  char *result = hdb_get(db, key);
  if (!result) result = "NULL";
  return scope.Close(String::New(result));
}


void init(Handle<Object> exports) {  
  exports->Set(String::NewSymbol("get"),
      FunctionTemplate::New(Get)->GetFunction());
  exports->Set(String::NewSymbol("set"),
      FunctionTemplate::New(Set)->GetFunction());
}

NODE_MODULE(hackdb, init)