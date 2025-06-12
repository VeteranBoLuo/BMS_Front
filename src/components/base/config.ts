import _ from 'lodash-es';
import { defineStore } from 'pinia';
import { ref } from 'vue';

function customizer(obj: any, src: any) {
  if (_.isArray(obj)) {
    return src;
  }
  if (_.isEmpty(src)) {
    return src;
  }
}

export function defineComponentConfig(config_id: string) {
  return defineStore(config_id, () => {
    const ref_config = ref({
      settings: {} as any,
      methods: {} as any,
      events: {} as any,
      styles: {} as any,
      classes: {} as any,
    });

    let default_config = {};
    let config = {};
    function setConfig(config_new: any) {
      config = _.mergeWith(config, config_new, customizer);
      mergeConfig();
    }

    function setDefaultConfig(default_config_new: any) {
      default_config = default_config_new;
      mergeConfig();
    }

    function mergeConfig() {
      const config_final = _.mergeWith(default_config, config, customizer);
      _.mergeWith(ref_config.value, config_final, customizer);
    }

    function useConfig() {
      return ref_config;
    }
    function useSettings() {
      return ref(ref_config.value.settings);
    }
    function useMethods() {
      return ref(ref_config.value.methods);
    }
    function useEvents() {
      return ref(ref_config.value.events);
    }
    function useStyles() {
      return ref(ref_config.value.styles);
    }
    function useClasses() {
      return ref(ref_config.value.classes);
    }

    return {
      useConfig,
      useSettings,
      useMethods,
      useEvents,
      useStyles,
      useClasses,
      setConfig,
      setDefaultConfig,
    };
  });
}

export function useComponentConfigStoreById(config_id: string) {
  const useConfigStore = defineComponentConfig(config_id);
  return useConfigStore();
}

export function getConfigIdByPropsWithDefault(props: any, default_v: string) {
  return props.config_id === undefined ? default_v : props.config_id;
}
