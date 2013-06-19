// The thing I want:
#include "./hackdb/core.h"

#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Method(const Arguments& args) {
  hdb_t *db = hdb_create();
  hdb_set(db, "foo", "bar");
  hdb_record *result = hdb_get(db, "foo");

  HandleScope scope;
  return scope.Close(String::New(result->value));
}

void init(Handle<Object> exports) {  
  exports->Set(String::NewSymbol("hackdb"),
      FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(hackdb, init)