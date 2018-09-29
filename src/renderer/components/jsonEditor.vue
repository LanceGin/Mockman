<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

// eslint-disable-next-line
require('script-loader!jsonlint');

export default {
  name: 'jsonEditor',
  data() {
    return {
      jsonEditor: false,
    };
  },
  props: ['value'],
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue();
      if (value !== editorValue) {
        this.jsonEditor.setValue(this.value);
      }
    },
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: {
        name: 'javascript',
        json: true,
      },
      gutters: ['CodeMirror-lint-markers'],
      theme: 'monokai',
      lint: true,
    });

    this.jsonEditor.setValue(this.value);
    this.jsonEditor.on('change', (cm) => {
      this.$emit('changed', cm.getValue());
      this.$emit('input', cm.getValue());
    });
    // emit blur method to parent component
    this.jsonEditor.on('blur', () => {
      this.$emit('blur');
    });
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue();
    },
    // autoRefresh doesn't work
    refresh() {
      this.jsonEditor.refresh();
    },
  },
};
</script>

<style>
.json-editor{
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 300px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 300px;
}
.json-editor >>> .cm-s-monokai span.cm-string {
  color: #F08047;
}
</style>
