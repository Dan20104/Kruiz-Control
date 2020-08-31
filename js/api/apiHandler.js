class ApiHandler extends Handler {
  /**
   * Create a new API handler.
   */
  constructor() {
    super('API', []);
    this.success();
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    if (triggerData[1].toLowerCase() === 'get') {
      var data = await this.callAPI(triggerData.slice(2).join(' '));
      return {api_data: data};
    }
  }

  /**
   * Call the input url and return the response.
   * @param {string} url API to call
   */
  async callAPI(url) {
    var response = null;
    try {
      await $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
          response = data;
        },
        error: function(data) {
          console.error(`Error calling the api: ${url}`);
          console.error(JSON.stringify(data));
        }
      });
    } catch (err) {
      response = 'Error';
    }

    return response;
  }
}

/**
 * Create a handler
 */
function apiHandlerExport() {
  var api = new ApiHandler();
}
apiHandlerExport();
