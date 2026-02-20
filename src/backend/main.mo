import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type UserId = Principal;
  type DateTime = Time.Time;
  type DietPreference = { #vegetarian; #nonVegetarian };
  type Goal = { #lessStress; #betterSleep; #betterFocus };
  type FocusBlockStatus = { #suggested; #accepted; #modified; #rejected };

  type FocusBlock = {
    id : Text;
    startTime : Time.Time;
    endTime : Time.Time;
    description : Text;
    status : FocusBlockStatus;
  };

  type UserPreferences = {
    wakeTime : Time.Time;
    sleepTime : Time.Time;
    workHours : (Time.Time, Time.Time);
    typicalMeetingLoad : Int;
    caffeineHabits : Text;
    dietPreference : DietPreference;
    goals : [Goal];
  };

  type Meeting = {
    startTime : DateTime;
    endTime : DateTime;
    description : Text;
    priority : Nat8; // 1-10 scale, higher is higher priority
    diaryEntries : [Activity];
    isRepeating : Bool;
    repeatInterval : ?Nat8; // in days, if applicable
  };

  type Activity = {
    id : Text;
    description : Text;
    startTime : Time.Time;
    endTime : Time.Time;
  };

  type FocusedIntervals = {
    id : Text;
    description : Text;
    startTime : Time.Time;
    endTime : Time.Time;
  };

  type Prediction = {
    dateTime : Time.Time;
    predictedFocusLevel : Int; // 0-100 scale
  };

  type StressCheckIn = {
    stressLevel : Nat;
    timestamp : Time.Time;
  };

  type SmartReminder = {
    reminderTime : Time.Time;
    message : Text;
  };

  type SleepAdvice = {
    advice : Text;
    timestamp : Time.Time;
  };

  type UserProfile = {
    userId : UserId;
    preferences : UserPreferences;
    lastCalendarSync : ?Time.Time;
    weeklyInsights : [Text];
    contentPreferences : {
      useAI : Bool;
      avoidCertainContent : Bool;
    };
  };

  module FocusBlock {
    public func compare(fb1 : FocusBlock, fb2 : FocusBlock) : Order.Order {
      Text.compare(fb1.id, fb2.id);
    };
  };

  // State
  let userProfiles = Map.empty<UserId, UserProfile>();
  let dailyEntries = Map.empty<UserId, List.List<Activity>>();
  let focusedIntervals = Map.empty<UserId, List.List<FocusedIntervals>>();
  let futurePredictions = Map.empty<UserId, List.List<Prediction>>();
  let focusBlocks = Map.empty<UserId, List.List<FocusBlock>>();
  let stressCheckIns = Map.empty<UserId, List.List<StressCheckIn>>();
  let smartReminders = Map.empty<UserId, List.List<SmartReminder>>();
  let sleepAdvice = Map.empty<UserId, List.List<SleepAdvice>>();
  let meetings = Map.empty<UserId, List.List<Meeting>>();
  let socialInteractionGoals = Map.empty<UserId, List.List<Text>>();

  public shared ({ caller }) func createOrUpdateUserProfile(userProfile : UserProfile) : async () {
    userProfiles.add(caller, userProfile);
  };

  public query ({ caller }) func getUserProfile(userId : UserId) : async ?UserProfile {
    userProfiles.get(userId);
  };

  public shared ({ caller }) func addActivity(userId : UserId, activity : Activity) : async () {
    let currentEntries = switch (dailyEntries.get(userId)) {
      case (null) { List.empty<Activity>() };
      case (?entries) { entries };
    };
    currentEntries.add(activity);
    dailyEntries.add(userId, currentEntries);
  };

  public query ({ caller }) func getActivities(userId : UserId) : async [Activity] {
    switch (dailyEntries.get(userId)) {
      case (null) { [] };
      case (?entries) { entries.reverse().toArray() };
    };
  };

  public shared ({ caller }) func addFocusBlock(userId : UserId, focusBlock : FocusBlock) : async () {
    let currentBlocks = switch (focusBlocks.get(userId)) {
      case (null) { List.empty<FocusBlock>() };
      case (?blocks) { blocks };
    };
    currentBlocks.add(focusBlock);
    focusBlocks.add(userId, currentBlocks);
  };

  public query ({ caller }) func getFocusBlocks(userId : UserId) : async [FocusBlock] {
    switch (focusBlocks.get(userId)) {
      case (null) { [] };
      case (?blocks) { blocks.toArray().sort() };
    };
  };

  public shared ({ caller }) func addStressCheckIn(userId : UserId, level : Nat) : async () {
    let checkIn : StressCheckIn = { stressLevel = level; timestamp = Time.now() };
    let currentCheckIns = switch (stressCheckIns.get(userId)) {
      case (null) { List.empty<StressCheckIn>() };
      case (?checkIns) { checkIns };
    };
    currentCheckIns.add(checkIn);
    stressCheckIns.add(userId, currentCheckIns);
  };

  public shared ({ caller }) func addMeeting(userId : UserId, meeting : Meeting) : async () {
    let currentMeetings = switch (meetings.get(userId)) {
      case (null) { List.empty<Meeting>() };
      case (?mr) { mr };
    };
    currentMeetings.add(meeting);
    meetings.add(userId, currentMeetings);
  };

  public shared ({ caller }) func removeMeeting(userId : Text, meetingId : Text) : async () {
    let userIdVal = Principal.fromText(userId);
    switch (meetings.get(userIdVal)) {
      case (null) {
        Runtime.trap("Meeting id not found. Could not delete. ");
      };
      case (?meetingList) {
        let filteredList = meetingList.filter(func(meeting) { meeting.description == meetingId });
        meetings.add(userIdVal, filteredList);
      };
    };
  };

  public shared ({ caller }) func markComplete(userId : Text, meetingId : Text) : async () {
    let userIdVal = Principal.fromText(userId);
    switch (futurePredictions.get(userIdVal)) {
      case (null) { () };
      case (?predictionsList) {
        let filteredList = predictionsList.filter(func(prediction) { prediction.dateTime != Time.now() });
        futurePredictions.add(userIdVal, filteredList);
      };
    };
  };
};
