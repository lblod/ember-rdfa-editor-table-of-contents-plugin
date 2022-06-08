import RdfaIcSamplePlugin from '../rdfa-toc-sample-plugin';

function pluginFactory(plugin) {
  return {
    create: (initializers) => {
      const pluginInstance = new plugin();
      Object.assign(pluginInstance, initializers);
      return pluginInstance;
    },
  };
}

export function initialize(application) {
  application.register('plugin:rdfa-toc', pluginFactory(RdfaIcSamplePlugin), {
    singleton: false,
  });
}

export default {
  initialize,
};
