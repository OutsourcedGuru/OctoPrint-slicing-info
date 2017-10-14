/*
 * View model for OctoPrint-Slicing-info
 *
 * Author: Michael Blankenship
 * License: AGPLv3
 */
$(function() {
    function SlicingInfoViewModel(parameters) {
        var self = this;

        self.loginState = parameters[0];
        self.settings = parameters[1];
        self.stateString = ko.observable(undefined);
        self.filename = ko.observable(undefined);
        self.filepath = ko.observable(undefined);
        self.filesize = ko.observable(undefined);
        self.sd = ko.observable(undefined);
        self.michael = ko.observable(gettext("Hello"));
        
        self._fromData = function(data) {
            self._processJobData(data.job);
        };

        self._processJobData = function(data) {
            if (data.file) {
                self.filename(data.file.name);
                self.filepath(data.file.path);
                self.filesize(data.file.size);
                self.sd(data.file.origin == "sdcard");
            } else {
                self.filename(undefined);
                self.filepath(undefined);
                self.filesize(undefined);
                self.sd(undefined);
            }
        };

        // assign the injected parameters, e.g.:
        // self.loginStateViewModel = parameters[0];
        // self.settingsViewModel = parameters[1];

        // TODO: Implement your plugin's view model here.
    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push([
        SlicingInfoViewModel,
        ["loginStateViewModel", "settingsViewModel"],
        ["#state_wrapper", "#drop_overlay"]
    ]);


    //OCTOPRINT_VIEWMODELS.push([
    //    Slicing-infoViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
    //    [ /* "loginStateViewModel", "settingsViewModel" */ ],

        // e.g. #settings_plugin_slicing-info, #tab_plugin_slicing-info, ...
    //    [ /* ... */ ]
    //]);
});
