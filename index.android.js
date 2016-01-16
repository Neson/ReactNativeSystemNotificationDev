import React, {
  AppRegistry,
  DeviceEventEmitter,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Notification from 'react-native-system-notification';

const defaultNotificationSendArgs = `{
  "id": null,
  "subject": "Subject",
  "message": "Message",
  "sound": "default",
  "vibrate": "default",
  "lights": "default"
}`;

var ReactNativeSystemNotificationDev017 = React.createClass({
  getInitialState: function() {
    return {
      notificationSendArgs: defaultNotificationSendArgs
    };
  },

  componentWillMount: function() {
    DeviceEventEmitter.addListener('sysNotificationClick', function(e) {
      console.log('sysNotificationClick', e);
      React.ToastAndroid.show(`Notification Clicked: ${e.action}: ${JSON.stringify(e, null, 2)}`, React.ToastAndroid.LONG);
    });
  },

  _handleCreateNotification: function() {
    var notification = {};

    try {
      notification = JSON.parse(this.state.notificationSendArgs);
    } catch (e) {
      React.ToastAndroid.show(`Error: ${e}`, React.ToastAndroid.LONG);
    }

    Notification.create(notification).then(function (n) {
      React.ToastAndroid.show(`Notification Created: ${JSON.stringify(n, null, 2)}`, React.ToastAndroid.LONG);
    }).catch((e) => {
      React.ToastAndroid.show(`Error: ${e}`, React.ToastAndroid.LONG);
    });
  },

  render: function() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            onChangeText={(notificationSendArgs) => this.setState({ notificationSendArgs })}
            multiline={true}
            autoCorrect={false}
            autoCapitalize="none"
            value={this.state.notificationSendArgs}
            underlineColorAndroid="transparent"
            numberOfLines={this.state.notificationSendArgs.split(/\r\n|\r|\n/).length}
            textAlign="start"
            textAlignVertical="top"
            style={styles.commandInput}
          />
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={this._handleCreateNotification}
        >
          <Text style={styles.actionButtonText}>Create Notification</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inputBox: {
    borderColor: '#AAAAAA',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#FFFFFF'
  },
  commandInput: {
    fontFamily: 'monospace',
    fontSize: 14,
    lineHeight: 18
  },
  actionButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  actionButtonText: {
    fontSize: 18
  }
});

AppRegistry.registerComponent('ReactNativeSystemNotificationDev017', () => ReactNativeSystemNotificationDev017);
