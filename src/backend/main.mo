import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type User = Principal;

  public type Profile = {
    username : Text;
    bio : Text;
    avatar : Storage.ExternalBlob;
    followers : [User];
    following : [User];
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type Comment = {
    author : User;
    content : Text;
    timestamp : Time.Time;
  };

  type InternalPost = {
    image : Storage.ExternalBlob;
    caption : Text;
    likes : Set.Set<User>;
    comments : [Comment];
    timestamp : Time.Time;
    author : User;
  };

  public type Post = {
    image : Storage.ExternalBlob;
    caption : Text;
    likes : ?[User];
    comments : [Comment];
    timestamp : Time.Time;
    author : User;
  };

  public type Notification = {
    message : Text;
    timestamp : Time.Time;
    read : Bool;
  };

  let profiles = Map.empty<User, Profile>();
  let posts = Map.empty<Text, InternalPost>();
  let notifications = Map.empty<User, [Notification]>();

  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : User) : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };
};
