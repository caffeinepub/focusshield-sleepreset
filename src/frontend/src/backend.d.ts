import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export interface UserPreferences {
    typicalMeetingLoad: bigint;
    sleepTime: Time;
    dietPreference: DietPreference;
    wakeTime: Time;
    caffeineHabits: string;
    goals: Array<Goal>;
    workHours: [Time, Time];
}
export type Time = bigint;
export interface Meeting {
    startTime: DateTime;
    isRepeating: boolean;
    endTime: DateTime;
    repeatInterval?: number;
    description: string;
    diaryEntries: Array<Activity>;
    priority: number;
}
export interface FocusBlock {
    id: string;
    startTime: Time;
    status: FocusBlockStatus;
    endTime: Time;
    description: string;
}
export type DateTime = bigint;
export interface Activity {
    id: string;
    startTime: Time;
    endTime: Time;
    description: string;
}
export interface UserProfile {
    userId: UserId;
    lastCalendarSync?: Time;
    preferences: UserPreferences;
    weeklyInsights: Array<string>;
    contentPreferences: {
        avoidCertainContent: boolean;
        useAI: boolean;
    };
}
export enum DietPreference {
    nonVegetarian = "nonVegetarian",
    vegetarian = "vegetarian"
}
export enum FocusBlockStatus {
    modified = "modified",
    suggested = "suggested",
    rejected = "rejected",
    accepted = "accepted"
}
export enum Goal {
    betterFocus = "betterFocus",
    betterSleep = "betterSleep",
    lessStress = "lessStress"
}
export interface backendInterface {
    addActivity(userId: UserId, activity: Activity): Promise<void>;
    addFocusBlock(userId: UserId, focusBlock: FocusBlock): Promise<void>;
    addMeeting(userId: UserId, meeting: Meeting): Promise<void>;
    addStressCheckIn(userId: UserId, level: bigint): Promise<void>;
    createOrUpdateUserProfile(userProfile: UserProfile): Promise<void>;
    getActivities(userId: UserId): Promise<Array<Activity>>;
    getFocusBlocks(userId: UserId): Promise<Array<FocusBlock>>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    markComplete(userId: string, meetingId: string): Promise<void>;
    removeMeeting(userId: string, meetingId: string): Promise<void>;
}
