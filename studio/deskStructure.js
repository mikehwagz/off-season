import S from '@sanity/desk-tool/structure-builder'
import React from 'react'
import Emoji from 'react-emoji-render'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🏡" />)
        .child(
          S.editor()
            .title('Homepage')
            .schemaType('homepage')
            .documentId('homepage'),
        ),
      S.listItem()
        .title('Settings')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🌎" />)
        .child(
          S.editor()
            .title('Settings')
            .schemaType('config')
            .documentId('config'),
        ),
      S.divider(),
      S.listItem()
        .title('Projects')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🎨" />)
        .child(S.documentTypeList('project').title('Projects')),
      S.listItem()
        .title('Pages')
        .icon(() => <Emoji style={{ fontSize: 30 }} text="🗞️" />)
        .child(S.documentTypeList('page').title('Pages')),
    ])
