# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class SlicingInfoPlugin(octoprint.plugin.StartupPlugin,
                         octoprint.plugin.SettingsPlugin,
                         octoprint.plugin.AssetPlugin,
                         octoprint.plugin.TemplatePlugin):

	##~~ SettingsPlugin mixin
	def on_after_startup(self):
		self._logger.info("Found settings variable (Slicer: %s)" % self._settings.get(["slicerString"]))

	def get_settings_defaults(self):
		return dict(
      slicerString="Cura"
		)

	def get_template_vars(self):
		return dict(
			slicer=self._settings.get(["slicerString"]),
			michael="HelloWorld"
		)

	##~~ AssetPlugin mixin

	def get_assets(self):
		return dict(
			js=["js/slicinginfo.js"],
			css=["css/slicinginfo.css"],
			less=["less/slicinginfo.less"]
		)

	##~~ Softwareupdate hook

	def get_update_information(self):
		# Define the configuration for your plugin to use with the Software Update
		# Plugin here. See https://github.com/foosel/OctoPrint/wiki/Plugin:-Software-Update
		# for details.
		return dict(
			slicinginfo=dict(
				displayName="Slicing-info Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="OutsourcedGuru",
				repo="OctoPrint-slicing-info",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/OutsourcedGuru/OctoPrint-slicing-info/archive/{target_version}.zip"
			)
		)


__plugin_name__ = "Slicing Info"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = SlicingInfoPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

