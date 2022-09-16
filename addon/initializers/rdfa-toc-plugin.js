import RdfaTocPlugin from '../rdfa-toc-plugin';

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
  application.register('plugin:rdfa-toc', pluginFactory(RdfaTocPlugin), {
    singleton: false,
  });
}

export default {
  initialize,
};
