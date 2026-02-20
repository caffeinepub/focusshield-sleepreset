import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserProfile, Activity, FocusBlock, Meeting } from '../backend';

export function useUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return null;
      const profile = await actor.getUserProfile(identity.getPrincipal());
      return profile;
    },
    enabled: !!actor && !!identity && !actorFetching,
  });
}

export function useCreateOrUpdateProfile() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createOrUpdateUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
}

export function useActivities() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Activity[]>({
    queryKey: ['activities', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return await actor.getActivities(identity.getPrincipal());
    },
    enabled: !!actor && !!identity && !actorFetching,
  });
}

export function useAddActivity() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activity: Activity) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      await actor.addActivity(identity.getPrincipal(), activity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function useFocusBlocks() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<FocusBlock[]>({
    queryKey: ['focusBlocks', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return await actor.getFocusBlocks(identity.getPrincipal());
    },
    enabled: !!actor && !!identity && !actorFetching,
  });
}

export function useAddFocusBlock() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (focusBlock: FocusBlock) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      await actor.addFocusBlock(identity.getPrincipal(), focusBlock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['focusBlocks'] });
    },
  });
}

export function useAddStressCheckIn() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (level: number) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      await actor.addStressCheckIn(identity.getPrincipal(), BigInt(level));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}

export function useAddMeeting() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meeting: Meeting) => {
      if (!actor || !identity) throw new Error('Not authenticated');
      await actor.addMeeting(identity.getPrincipal(), meeting);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
}
