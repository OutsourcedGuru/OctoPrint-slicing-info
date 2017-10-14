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
        self.printerState = parameters[2];
        self.filename = ko.observable(undefined);
        self.filepath = ko.observable(undefined);
        self.michael = ko.observable(undefined);

        self.filename("here.gcode");
        self.filepath("~/.oprint/uploads/share/here.gcode");
        self.michael("Hello");

        self.onEventFileSelected = function(data) {
            // {name}, {path}, {origin} (local or sdcard)
            self.filename(data.filename);
            self.filepath(data.filepath);            
        }

    }

    // view model class, parameters for constructor, container to bind to
    OCTOPRINT_VIEWMODELS.push({
        construct: SlicingInfoViewModel,
        dependencies: ["loginStateViewModel", "settingsViewModel", "printerStateViewModel"],
        elements: ["#sidebar_plugin_slicinginfo_wrapper"]
    });
});
