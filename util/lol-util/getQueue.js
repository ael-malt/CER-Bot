const queues = require("./queues.json")
    
    module.exports = function getQueue(gameQueueConfigId) {

      for (var i in queues) {

        if ([i].queueId == gameQueueConfigId) {
          return [i].description
        }
      }

    }