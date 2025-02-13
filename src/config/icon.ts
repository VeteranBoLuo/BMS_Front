export default {
  // 空白图片
  nullImg:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIwLjhlbSIgaGVpZ2h0PSIwLjhlbSIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSIjNWI1YjViIiBkPSJNMTAgMjBhMTAgMTAgMCAxIDEgMC0yMGExMCAxMCAwIDAgMSAwIDIwbTcuNzUtOGE4IDggMCAwIDAgMC00aC0zLjgyYTI5IDI5IDAgMCAxIDAgNHptLS44MiAyaC0zLjIyYTE0LjQgMTQuNCAwIDAgMS0uOTUgMy41MUE4LjAzIDguMDMgMCAwIDAgMTYuOTMgMTRtLTguODUtMmgzLjg0YTI0LjYgMjQuNiAwIDAgMCAwLTRIOC4wOGEyNC42IDI0LjYgMCAwIDAgMCA0bS4yNSAyYy40MSAyLjQgMS4xMyA0IDEuNjcgNHMxLjI2LTEuNiAxLjY3LTR6bS02LjA4LTJoMy44MmEyOSAyOSAwIDAgMSAwLTRIMi4yNWE4IDggMCAwIDAgMCA0bS44MiAyYTguMDMgOC4wMyAwIDAgMCA0LjE3IDMuNTFjLS40Mi0uOTYtLjc0LTIuMTYtLjk1LTMuNTF6bTEzLjg2LThhOC4wMyA4LjAzIDAgMCAwLTQuMTctMy41MWMuNDIuOTYuNzQgMi4xNi45NSAzLjUxem0tOC42IDBoMy4zNGMtLjQxLTIuNC0xLjEzLTQtMS42Ny00UzguNzQgMy42IDguMzMgNk0zLjA3IDZoMy4yMmMuMi0xLjM1LjUzLTIuNTUuOTUtMy41MUE4LjAzIDguMDMgMCAwIDAgMy4wNyA2Ii8+PC9zdmc+',
  // 登录页面图标
  login: {
    password:
      '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10zm0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3"/></svg>',
    email:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIyIDZjMC0xLjEtLjktMi0yLTJINGMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMnptLTIgMGwtOCA1bC04LTV6bTAgMTJINFY4bDggNWw4LTV6Ii8+PC9zdmc+',
    code: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTkuMTM0IDIuNWMtMi42NjYuMDYtNC4yMjMuMzE1LTUuMjg3IDEuMzc1QzIuOTE1IDQuODAzIDIuNjA0IDYuMTA4IDIuNSA4LjJtMTIuMzY2LTUuN2MyLjY2Ni4wNiA0LjIyMy4zMTUgNS4yODcgMS4zNzVjLjkzMi45MjggMS4yNDMgMi4yMzMgMS4zNDcgNC4zMjVtLTYuNjM0IDEzLjNjMi42NjYtLjA2IDQuMjIzLS4zMTUgNS4yODctMS4zNzVjLjkzMi0uOTI4IDEuMjQzLTIuMjMzIDEuMzQ3LTQuMzI1TTkuMTM0IDIxLjVjLTIuNjY2LS4wNi00LjIyMy0uMzE1LTUuMjg3LTEuMzc1Yy0uOTMyLS45MjgtMS4yNDMtMi4yMzMtMS4zNDctNC4zMjVtNSAxLjJjMi4zMzItMi40NDIgNi42NDMtMi41NTcgOSAwbS0yLjAwNS03LjVjMCAxLjM4LTEuMTIgMi41LTIuNTAzIDIuNWEyLjUgMi41IDAgMCAxLTIuNTA0LTIuNWMwLTEuMzggMS4xMi0yLjUgMi41MDQtMi41YTIuNSAyLjUgMCAwIDEgMi41MDMgMi41IiBjb2xvcj0iIzAwMCIvPjwvc3ZnPg==',
  },

  // 导航栏图标
  navigation: {
    search:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJtMjAgMjBsLTQuMDUtNC4wNW0wIDBhNyA3IDAgMSAwLTkuOS05LjlhNyA3IDAgMCAwIDkuOSA5LjkiIC8+Cjwvc3ZnPg==',
    phone_search:
      '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"/></g></svg>',
    sun: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTIgNFYybTAgMTh2Mk02LjQxNCA2LjQxNEw1IDVtMTIuNzI4IDEyLjcyOGwxLjQxNCAxLjQxNE00IDEySDJtMTggMGgybS00LjI3MS01LjU4NkwxOS4xNDMgNU02LjQxNSAxNy43MjhMNSAxOS4xNDJNMTIgMTdhNSA1IDAgMSAxIDAtMTBhNSA1IDAgMCAxIDAgMTAiIC8+Cjwvc3ZnPg==',
    moon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+Cgk8cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0ibm9uZSIgLz4KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiIGQ9Ik0zODguMzEgMjcyYzQ3Ljc1IDAgODkuNzctMjcuNzcgMTA3LjY5LTY4LjkyYy0xNC4yMSA2LjE4LTMwLjkgOC42MS00Ny4zOCA4LjYxQTExNi4zMSAxMTYuMzEgMCAwIDEgMzMyLjMxIDk1LjM4YzAtMTYuNDggMi40My0zMy4xNyA4LjYxLTQ3LjM4QzI5OS43NyA2NS45MiAyNzIgMTA3Ljk0IDI3MiAxNTUuNjlhMTE2LjMgMTE2LjMgMCAwIDAgMy40NCAyOC4xOCIgLz4KCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMyIiBkPSJNOTAuNjEgMzA2Ljg1QTE2LjA3IDE2LjA3IDAgMCAwIDEwNCAyOTMuNkMxMTYuMDkgMjIwLjE3IDE2OS42MyAxNzYgMjMyIDE3NmM1Ny45MyAwIDk2LjYyIDM3Ljc1IDExMi4yIDc3Ljc0YTE1Ljg0IDE1Ljg0IDAgMCAwIDEyLjIgOS44N2M1MCA4LjE1IDkxLjYgNDEuNTQgOTEuNiA5OS41OWMwIDU5LjQtNDguNiAxMDAuOC0xMDggMTAwLjhIMTA2Yy00OS41IDAtOTAtMjQuNy05MC03OS4yYzAtNDguNDcgMzguNjctNzIuMjIgNzQuNjEtNzcuOTVaIiAvPgo8L3N2Zz4=',
    user: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIj4KCQk8Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiIC8+CgkJPHBhdGggZD0iTTIwIDIxYTggOCAwIDAgMC0xNiAwIiAvPgoJPC9nPgo8L3N2Zz4=',
    menu: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMyAxOHYtMmgxOHYyem0wLTV2LTJoMTh2MnptMC01VjZoMTh2MnoiIC8+Cjwvc3ZnPg==',
    close:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtMTIgMTMuNGwtNC45IDQuOXEtLjI3NS4yNzUtLjcuMjc1dC0uNy0uMjc1dC0uMjc1LS43dC4yNzUtLjdsNC45LTQuOWwtNC45LTQuOXEtLjI3NS0uMjc1LS4yNzUtLjd0LjI3NS0uN3QuNy0uMjc1dC43LjI3NWw0LjkgNC45bDQuOS00LjlxLjI3NS0uMjc1LjctLjI3NXQuNy4yNzV0LjI3NS43dC0uMjc1LjdMMTMuNCAxMmw0LjkgNC45cS4yNzUuMjc1LjI3NS43dC0uMjc1Ljd0LS43LjI3NXQtLjctLjI3NXoiIC8+Cjwvc3ZnPg==',
    exit: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNCAyMHEtLjgyNSAwLTEuNDEyLS41ODdUMiAxOHYtN2gydjdoMTZWNmgtOVY0aDlxLjgyNSAwIDEuNDEzLjU4OFQyMiA2djEycTAgLjgyNS0uNTg3IDEuNDEzVDIwIDIwem0xMy4wNzUtMy41bDEuNDI1LTEuNDI1TDE1LjQgMTJIMTh2LTJoLTZ2Nmgydi0yLjU3NXpNMiA5VjRoN3Y1em0xMCAzIiAvPgo8L3N2Zz4=',
    permissions:
      'data:image/svg+  xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPgoJPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSJub25lIiAvPgoJPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ij4KCQk8cGF0aCBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMjAgMTBINmEyIDIgMCAwIDAtMiAydjI2YTIgMiAwIDAgMCAyIDJoMzZhMiAyIDAgMCAwIDItMnYtMi41IiAvPgoJCTxwYXRoIGQ9Ik0xMCAyM2g4bS04IDhoMjQiIC8+CgkJPGNpcmNsZSBjeD0iMzQiIGN5PSIxNiIgcj0iNiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KCQk8cGF0aCBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNNDQgMjguNDE5QzQyLjA0NyAyNC42MDIgMzggMjIgMzQgMjJzLTUuOTkzIDEuMTMzLTguMDUgMyIgLz4KCTwvZz4KPC9zdmc+',
  },

  userCenter: {
    info: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgoJPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUgM3YxMEgxVjN6bTEtMUgwdjEyaDE2eiIgLz4KCTxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTggNWg2djFIOHptMCAyaDZ2MUg4em0wIDJoM3YxSDh6TTUuNCA3SDV2LS4xYy42LS4yIDEtLjggMS0xLjRDNiA0LjcgNS4zIDQgNC41IDRTMyA0LjcgMyA1LjVjMCAuNy40IDEuMiAxIDEuNFY3aC0uNEMyLjcgNyAyIDcuNyAyIDguNlYxMWg1VjguNkM3IDcuNyA2LjMgNyA1LjQgNyIgLz4KPC9zdmc+',
    log: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+Cgk8cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0ibm9uZSIgLz4KCTxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzIxLjkyMyA0Mi42NjdIODcuMjU2djIzNC42NjdoNDIuNjY3di0xOTJoMTc0LjI5M2w4MS43MDcgODEuNzA2djExMC4yOTRoNDIuNjY2di0xMjh6TTg1LjU3MyA0NDhWMzIwLjAyOGgyOC44MXYxMDUuMzk0aDU1VjQ0OHptMTUzLjE3LTEzMC4yM3EzMC4xNjUgMCA0Ni4yNCAxOS4xNDZxMTUuNDQ0IDE4LjMzNCAxNS40NDMgNDcuMTQzcTAgMzEuNTE5LTE4LjI0MyA1MC4xMjRxLTE1LjcxNCAxNi4wNzUtNDMuNDQgMTYuMDc1cS0zMC4xNjUgMC00Ni4yNC0xOS4xNDZxLTE1LjQ0My0xOC4zMzQtMTUuNDQzLTQ3Ljg2NnEwLTMwLjg4NyAxOC4yNDMtNDkuNDkxcTE1LjgwNC0xNS45ODUgNDMuNDQtMTUuOTg1bS0uMDkgMjIuNTc4cS0xNS42MjQgMC0yNC4xMTQgMTMuMDA1cS03LjY3NiAxMS43NC03LjY3NiAzMC4xNjRxMCAyMS4zMTUgOS4xMjEgMzMuMDU1cTguNTggMTEuMTA4IDIyLjc1OSAxMS4xMDhxMTUuNTM0IDAgMjQuMjA0LTEzLjA5NXE3LjY3Ni0xMS41NiA3LjY3Ni0zMC41MjZxMC0yMC44NjItOS4xMjEtMzIuNjAzcS04LjU4LTExLjEwOC0yMi44NS0xMS4xMDhtMTkwLjgzIDM2LjAzNXY2NS4yOTVxLTExLjAxOCAzLjcwNC0xNS41MzQgNC44NzdxLTEzLjk5OCAzLjcwMy0zMC4wNzQgMy43MDNxLTMxLjYxIDAtNDguMTM2LTE1Ljg5NXEtMTguMzM0LTE3LjUyLTE4LjMzNC00OC44NTlxMC0zNi4wMzUgMjIuNzU5LTU0LjM2OHExNi41MjctMTMuMzY1IDQ0LjYxNC0xMy4zNjZxMjQuMDI0IDAgNDQuNzA1IDguNzZsLTkuODQ0IDIyLjQ4OHEtOS43NTQtNC44NzYtMTcuMDctNi44MTlxLTcuMzE1LTEuOTQxLTE2LjA3NS0xLjk0MXEtMjAuOTUyIDAtMzAuODg3IDEzLjYzN3EtOC4zOTkgMTEuNTU5LTguMzk5IDMwLjQzNXEwIDIyLjY2OSAxMi42NDQgMzQuMTM4cTEwLjExNSA5LjIxMiAyNS4xMDcgOS4yMTJxOC43NiAwIDE2LjYxNy0yLjk4di0yNS43NEgzNzkuNTR2LTIyLjU3N3oiIC8+Cjwvc3ZnPg==',
    home: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTEuMzM2IDIuMjUzYTEgMSAwIDAgMSAxLjMyOCAwbDkgOGExIDEgMCAwIDEtMS4zMjggMS40OTRMMjAgMTEuNDVWMTlhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTcuNTVsLS4zMzYuMjk3YTEgMSAwIDAgMS0xLjMyOC0xLjQ5NHpNNiA5LjY3VjE5aDN2LTVhMSAxIDAgMCAxIDEtMWg0YTEgMSAwIDAgMSAxIDF2NWgzVjkuNjcxbC02LTUuMzMzek0xMyAxOXYtNGgtMnY0eiIgLz4KPC9zdmc+',
    operationLog:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNDU5LjE1IDI2OS43NWExMzMuMTk3IDEzMy4xOTcgMCAwIDEtNTUuODYyIDE3OS45NzVsLTQyLjc4MiAyMi41NDFsLTEwLjUyIDUuNTMzYTcxLjI4IDcxLjI4IDAgMCAxLTYyLjk2NiAxLjY4NWwtMTY3LjA3Ny03MS4zOGwxNS43MzMtNDYuNjc2bDk5LjM2MyAxOS4xOTRsLTUxLjQ1OC05Ny43OGwtODIuODQzLTE1Ny40MTFsNDAuMzU3LTIxLjIzMmw4Mi44NDQgMTU3LjQ1N2wxOS45MzQtMTAuNDg1bC0zNi41MjEtNjkuNDQ1bDQwLjMzNS0yMS4yMmwzNi41MiA2OS40NDVsMTkuOTM1LTEwLjQ4NWwtMjguMi01My41OThsNDAuMzU4LTIxLjIzMmwyOC4yIDUzLjU5OGwxOS45NDUtMTAuNTc2bC0xOS4zNTQtMzYuODg2bDQwLjM0Ni0yMS4xNzRsMTkuMzU0IDM2Ljg4NWw1NC4zNDggMTAzLjMwMXpNNzMuMjY4IDE0Ni42NzRhNjAuMDMgNjAuMDMgMCAwIDEgNDIuMzYxLTEwMi40NTlhNjAuMDk4IDYwLjA5OCAwIDAgMSA1Ni41OCA4MC4xNjlsMTAuNTg4IDIwLjAxM0E3OC4yOSA3OC4yOSAwIDAgMCAxMTUuNzA4IDI2YTc4LjIzMyA3OC4yMzMgMCAwIDAtNS42MzUgMTU2LjI2Mkw5OS40MjggMTYyLjAyYTU5LjcgNTkuNyAwIDAgMS0yNi4xNi0xNS4zNDYiLz48L3N2Zz4=',
  },

  filterPanel: {
    list: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPGcgY2xhc3M9Imxpc3Qtb3V0bGluZSI+CgkJPGcgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iVmVjdG9yIj4KCQkJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNyA3YTEgMSAwIDAgMSAxLTFoMTFhMSAxIDAgMSAxIDAgMkg4YTEgMSAwIDAgMS0xLTFtMCA1YTEgMSAwIDAgMSAxLTFoMTFhMSAxIDAgMSAxIDAgMkg4YTEgMSAwIDAgMS0xLTFtMCA1YTEgMSAwIDAgMSAxLTFoMTFhMSAxIDAgMSAxIDAgMkg4YTEgMSAwIDAgMS0xLTEiIGNsaXAtcnVsZT0iZXZlbm9kZCIgLz4KCQkJPHBhdGggZD0iTTYgN2ExIDEgMCAxIDEtMiAwYTEgMSAwIDAgMSAyIDBtMCA1YTEgMSAwIDEgMS0yIDBhMSAxIDAgMCAxIDIgMG0wIDVhMSAxIDAgMSAxLTIgMGExIDEgMCAwIDEgMiAwIiAvPgoJCTwvZz4KCTwvZz4KPC9zdmc+',
    check:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJtOS41NSAxOGwtNS43LTUuN2wxLjQyNS0xLjQyNUw5LjU1IDE1LjE1bDkuMTc1LTkuMTc1TDIwLjE1IDcuNHoiIC8+Cjwvc3ZnPg==',
  },
  user_exit:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgoJPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMy41IDhjLjMgMCAuNS4yLjUuNXYyYzAgLjMtLjIuNS0uNS41cy0uNS0uMi0uNS0uNXYtMmMwLS4zLjItLjUuNS0uNW0wLTFDMi43IDcgMiA3LjcgMiA4LjV2MmMwIC44LjcgMS41IDEuNSAxLjVTNSAxMS4zIDUgMTAuNXYtMkM1IDcuNyA0LjMgNyAzLjUgN004IDd2My41YzAgLjMtLjIuNS0uNS41cy0uNS0uMi0uNS0uNVY3SDZ2My41YzAgLjguNyAxLjUgMS41IDEuNVM5IDExLjMgOSAxMC41Vjd6bTUgMGgtM3YxaDF2NGgxVjhoMXoiIC8+Cgk8cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xNSA2VjVoLTIuNEw4LjkgMmMuMS0uMi4xLS4zLjEtLjVDOSAuNyA4LjMgMCA3LjUgMFM2IC43IDYgMS41YzAgLjIgMCAuMy4xLjVMMi40IDVIMHY5aDF2MWgxNVY2ek02LjcgMi44Yy4zLjEuNS4yLjguMnMuNS0uMS44LS4yTDExIDVINHpNMTQgMTNIMVY2aDEzeiIgLz4KPC9zdmc+',
  user_admin:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+Cgk8ZyBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiPgoJCTxwYXRoIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0xNS42OCAxNC41ODdjMy40OSAwIDYuMzItMi44MTggNi4zMi02LjI5NFMxOS4xNyAyIDE1LjY4IDJTOS4zNjMgNC44MTggOS4zNjMgOC4yOTNjMCAxLjYxLjczNCAyLjc4MS43MzQgMi43ODFsLTcuNjQyIDcuNjFjLS4zNDMuMzQyLS44MjMgMS4yMyAwIDIuMDVsLjg4Mi44NzhjLjM0My4yOTMgMS4yMDUuNzAzIDEuOTEgMGwxLjAzLTEuMDI0YzEuMDI4IDEuMDI0IDIuMjA0LjQzOSAyLjY0NS0uMTQ3Yy43MzQtMS4wMjQtLjE0Ny0yLjA0OS0uMTQ3LTIuMDQ5bC4yOTQtLjI5M2MxLjQxIDEuNDA2IDIuNjQ1LjU4NiAzLjA4NiAwYy43MzUtMS4wMjQgMC0yLjA0OSAwLTIuMDQ5Yy0uMjk0LS41ODUtLjg4Mi0uNTg1LS4xNDctMS4zMTdsLjg4Mi0uODc4Yy43MDUuNTg1IDIuMTU1LjczMiAyLjc5Mi43MzJaIiAvPgoJCTxwYXRoIGQ9Ik0xNy44ODUgOC4yOTRhMi4yIDIuMiAwIDAgMS0yLjIwNCAyLjE5NWEyLjIgMi4yIDAgMCAxLTIuMjA0LTIuMTk1YTIuMiAyLjIgMCAwIDEgMi4yMDQtMi4xOTZhMi4yIDIuMiAwIDAgMSAyLjIwNCAyLjE5NloiIC8+Cgk8L2c+Cjwvc3ZnPg==',
  card_edit:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 21h18M12.222 5.828L15.05 3L20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 0 0-.293.707v4.536h4.536a1 1 0 0 0 .707-.293l5.607-5.607m-4.95-4.95l4.95 4.95"/></svg>',
  manage_categoryBtn_tag:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiPgoJCTxwYXRoIGQ9Im0xNy41MjQgMTcuNTI0bC0yLjcyMiAyLjcyM2EyLjU2NyAyLjU2NyAwIDAgMS0zLjYzNCAwTDQuMTMgMTMuMjA5QTMuODUgMy44NSAwIDAgMSAzIDEwLjQ4N1Y1LjU2OEEyLjU3IDIuNTcgMCAwIDEgNS41NjggM2g0LjkxOWMxLjAyMSAwIDIgLjQwNyAyLjcyMiAxLjEzbDcuMDM4IDcuMDM4YTIuNTY3IDIuNTY3IDAgMCAxIDAgMy42MzR6IiAvPgoJCTxwYXRoIGQ9Ik05LjEyNiAxMS42OTRhMi41NjggMi41NjggMCAxIDAgMC01LjEzN2EyLjU2OCAyLjU2OCAwIDAgMCAwIDUuMTM3IiAvPgoJPC9nPgo8L3N2Zz4=',
  manage_categoryBtn_bookmark:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiI+Cgk8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0ibm9uZSIgLz4KCTxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE4NCAzMkg3MmExNiAxNiAwIDAgMC0xNiAxNnYxNzZhOCA4IDAgMCAwIDEyLjI0IDYuNzhMMTI4IDE5My40M2w1OS43NyAzNy4zNUE4IDggMCAwIDAgMjAwIDIyNFY0OGExNiAxNiAwIDAgMC0xNi0xNm0wIDE2djExMy41N2wtNTEuNzctMzIuMzVhOCA4IDAgMCAwLTguNDggMEw3MiAxNjEuNTZWNDhabS01MS43NyAxMjkuMjJhOCA4IDAgMCAwLTguNDggMEw3MiAyMDkuNTd2LTI5LjE0bDU2LTM1bDU2IDM1djI5LjE0WiIgLz4KPC9zdmc+',
  table_edit:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjEgMTJhMSAxIDAgMCAwLTEgMXY2YTEgMSAwIDAgMS0xIDFINWExIDEgMCAwIDEtMS0xVjVhMSAxIDAgMCAxIDEtMWg2YTEgMSAwIDAgMCAwLTJINWEzIDMgMCAwIDAtMyAzdjE0YTMgMyAwIDAgMCAzIDNoMTRhMyAzIDAgMCAwIDMtM3YtNmExIDEgMCAwIDAtMS0xbS0xNSAuNzZWMTdhMSAxIDAgMCAwIDEgMWg0LjI0YTEgMSAwIDAgMCAuNzEtLjI5bDYuOTItNi45M0wyMS43MSA4YTEgMSAwIDAgMCAwLTEuNDJsLTQuMjQtNC4yOWExIDEgMCAwIDAtMS40MiAwbC0yLjgyIDIuODNsLTYuOTQgNi45M2ExIDEgMCAwIDAtLjI5LjcxbTEwLjc2LTguMzVsMi44MyAyLjgzbC0xLjQyIDEuNDJsLTIuODMtMi44M1pNOCAxMy4xN2w1LjkzLTUuOTNsMi44MyAyLjgzTDEwLjgzIDE2SDhaIiAvPgo8L3N2Zz4=',
  table_delete:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0icmVkIiBkPSJNNyA0YTIgMiAwIDAgMSAyLTJoNmEyIDIgMCAwIDEgMiAydjJoNGExIDEgMCAxIDEgMCAyaC0xLjA2OWwtLjg2NyAxMi4xNDJBMiAyIDAgMCAxIDE3LjA2OSAyMkg2LjkzYTIgMiAwIDAgMS0xLjk5NS0xLjg1OEw0LjA3IDhIM2ExIDEgMCAwIDEgMC0yaDR6bTIgMmg2VjRIOXpNNi4wNzQgOGwuODU3IDEySDE3LjA3bC44NTctMTJ6TTEwIDEwYTEgMSAwIDAgMSAxIDF2NmExIDEgMCAxIDEtMiAwdi02YTEgMSAwIDAgMSAxLTFtNCAwYTEgMSAwIDAgMSAxIDF2NmExIDEgMCAxIDEtMiAwdi02YTEgMSAwIDAgMSAxLTEiIC8+Cjwvc3ZnPg==',
  help_document:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMTUuNzUgMTNhLjc1Ljc1IDAgMCAwLS43NS0uNzVIOWEuNzUuNzUgMCAwIDAgMCAxLjVoNmEuNzUuNzUgMCAwIDAgLjc1LS43NW0wIDRhLjc1Ljc1IDAgMCAwLS43NS0uNzVIOWEuNzUuNzUgMCAwIDAgMCAxLjVoNmEuNzUuNzUgMCAwIDAgLjc1LS43NSIgLz4KCTxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNyAyLjI1QTIuNzUgMi43NSAwIDAgMCA0LjI1IDV2MTRBMi43NSAyLjc1IDAgMCAwIDcgMjEuNzVoMTBBMi43NSAyLjc1IDAgMCAwIDE5Ljc1IDE5VjcuOTY4YzAtLjM4MS0uMTI0LS43NTEtLjM1NC0xLjA1NWwtMi45OTgtMy45NjhhMS43NSAxLjc1IDAgMCAwLTEuMzk2LS42OTV6TTUuNzUgNWMwLS42OS41Ni0xLjI1IDEuMjUtMS4yNWg3LjI1djQuMzk3YzAgLjQxNC4zMzYuNzUuNzUuNzVoMy4yNVYxOWMwIC42OS0uNTYgMS4yNS0xLjI1IDEuMjVIN2MtLjY5IDAtMS4yNS0uNTYtMS4yNS0xLjI1eiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPgo8L3N2Zz4=',
  file_upload:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+Cgk8ZyBmaWxsPSJub25lIj4KCQk8cGF0aCBkPSJtMTIuNTkzIDIzLjI1OGwtLjAxMS4wMDJsLS4wNzEuMDM1bC0uMDIuMDA0bC0uMDE0LS4wMDRsLS4wNzEtLjAzNXEtLjAxNi0uMDA1LS4wMjQuMDA1bC0uMDA0LjAxbC0uMDE3LjQyOGwuMDA1LjAybC4wMS4wMTNsLjEwNC4wNzRsLjAxNS4wMDRsLjAxMi0uMDA0bC4xMDQtLjA3NGwuMDEyLS4wMTZsLjAwNC0uMDE3bC0uMDE3LS40MjdxLS4wMDQtLjAxNi0uMDE3LS4wMThtLjI2NS0uMTEzbC0uMDEzLjAwMmwtLjE4NS4wOTNsLS4wMS4wMWwtLjAwMy4wMTFsLjAxOC40M2wuMDA1LjAxMmwuMDA4LjAwN2wuMjAxLjA5M3EuMDE5LjAwNS4wMjktLjAwOGwuMDA0LS4wMTRsLS4wMzQtLjYxNHEtLjAwNS0uMDE4LS4wMi0uMDIybS0uNzE1LjAwMmEuMDIuMDIgMCAwIDAtLjAyNy4wMDZsLS4wMDYuMDE0bC0uMDM0LjYxNHEuMDAxLjAxOC4wMTcuMDI0bC4wMTUtLjAwMmwuMjAxLS4wOTNsLjAxLS4wMDhsLjAwNC0uMDExbC4wMTctLjQzbC0uMDAzLS4wMTJsLS4wMS0uMDF6IiAvPgoJCTxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTggOXYySDV2OWgxNHYtOWgtM1Y5aDNhMiAyIDAgMCAxIDIgMnY5YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi05YTIgMiAwIDAgMSAyLTJ6bTQuODg0LTYuNTMxbDMuMzU5IDMuMzU4YTEgMSAwIDEgMS0xLjQxNSAxLjQxNUwxMyA1LjQxM1YxNWExIDEgMCAxIDEtMiAwVjUuNDEzTDkuMTcyIDcuMjQyYTEgMSAwIDEgMS0xLjQxNS0xLjQxNWwzLjM2LTMuMzU4YTEuMjUgMS4yNSAwIDAgMSAxLjc2NyAwIiAvPgoJPC9nPgo8L3N2Zz4=',
  file_down:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIj4KCQk8cGF0aCBkPSJNMjAuOTg2IDEyLjUwOWE5IDkgMCAxIDAtOC40NTUgOC40NzZNMy42IDloMTYuOE0zLjYgMTVoMTAuOSIgLz4KCQk8cGF0aCBkPSJNMTEuNSAzYTE3IDE3IDAgMCAwIDAgMThtMS0xOGMyLjMxMyAzLjcwNiAzLjA3IDcuODU3IDIuMjcgMTJNMTkgMTZ2Nm0zLTNsLTMgM2wtMy0zIiAvPgoJPC9nPgo8L3N2Zz4=',
  theme:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIuNzUgMTJBOS4yNSA5LjI1IDAgMCAwIDEyIDIxLjI1VjIuNzVBOS4yNSA5LjI1IDAgMCAwIDIuNzUgMTIiLz48cGF0aCBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTEyIDIxLjI1YTkuMjUgOS4yNSAwIDAgMCAwLTE4LjVtMCAxOC41YTkuMjUgOS4yNSAwIDAgMSAwLTE4LjVtMCAxOC41VjIuNzUiLz48L2c+PC9zdmc+',
  arrow_left:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  noteDetail: {
    back: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPGcgZmlsbD0ibm9uZSI+CgkJPHBhdGggZD0iTTI0IDB2MjRIMFYwek0xMi41OTMgMjMuMjU4bC0uMDExLjAwMmwtLjA3MS4wMzVsLS4wMi4wMDRsLS4wMTQtLjAwNGwtLjA3MS0uMDM1cS0uMDE2LS4wMDUtLjAyNC4wMDVsLS4wMDQuMDFsLS4wMTcuNDI4bC4wMDUuMDJsLjAxLjAxM2wuMTA0LjA3NGwuMDE1LjAwNGwuMDEyLS4wMDRsLjEwNC0uMDc0bC4wMTItLjAxNmwuMDA0LS4wMTdsLS4wMTctLjQyN3EtLjAwNC0uMDE2LS4wMTctLjAxOG0uMjY1LS4xMTNsLS4wMTMuMDAybC0uMTg1LjA5M2wtLjAxLjAxbC0uMDAzLjAxMWwuMDE4LjQzbC4wMDUuMDEybC4wMDguMDA3bC4yMDEuMDkzcS4wMTkuMDA1LjAyOS0uMDA4bC4wMDQtLjAxNGwtLjAzNC0uNjE0cS0uMDA1LS4wMTktLjAyLS4wMjJtLS43MTUuMDAyYS4wMi4wMiAwIDAgMC0uMDI3LjAwNmwtLjAwNi4wMTRsLS4wMzQuNjE0cS4wMDEuMDE4LjAxNy4wMjRsLjAxNS0uMDAybC4yMDEtLjA5M2wuMDEtLjAwOGwuMDA0LS4wMTFsLjAxNy0uNDNsLS4wMDMtLjAxMmwtLjAxLS4wMXoiIC8+CgkJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMy42MzYgMTEuMjkzYTEgMSAwIDAgMCAwIDEuNDE0bDUuNjU3IDUuNjU3YTEgMSAwIDAgMCAxLjQxNC0xLjQxNEw2Ljc1NyAxM0gyMGExIDEgMCAxIDAgMC0ySDYuNzU3bDMuOTUtMy45NWExIDEgMCAwIDAtMS40MTQtMS40MTR6IiAvPgoJPC9nPgo8L3N2Zz4=',
    save: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgoJPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNS43NSAzQTIuNzUgMi43NSAwIDAgMCAzIDUuNzV2MTIuNUEyLjc1IDIuNzUgMCAwIDAgNS43NSAyMWg0LjI0OWEyLjEgMi4xIDAgMCAxIC4wNjItLjU5M2wuMjI3LS45MDdINy41di01LjI1YS43NS43NSAwIDAgMSAuNzUtLjc1aDYuNjAzbDEuNDM1LTEuNDM1QTIuMyAyLjMgMCAwIDAgMTUuNzUgMTJoLTcuNUEyLjI1IDIuMjUgMCAwIDAgNiAxNC4yNXY1LjI1aC0uMjVjLS42OSAwLTEuMjUtLjU2LTEuMjUtMS4yNVY1Ljc1YzAtLjY5LjU2LTEuMjUgMS4yNS0xLjI1SDd2Mi43NUEyLjI1IDIuMjUgMCAwIDAgOS4yNSA5LjVoNC41QTIuMjUgMi4yNSAwIDAgMCAxNiA3LjI1VjQuNTIzYy4zNTguMDYuNjkyLjIzLjk1Mi40OWwyLjAzNSAyLjAzNWMuMzI5LjMyOC41MTMuNzczLjUxMyAxLjIzOHYxLjcyMXEuMTA2LS4wMDcuMjEzLS4wMDdoLjAwMmMuNDM3IDAgLjg3NS4wODcgMS4yODUuMjYxVjguMjg3YTMuMjUgMy4yNSAwIDAgMC0uOTUyLTIuMjk5bC0yLjAzNS0yLjAzNUEzLjI1IDMuMjUgMCAwIDAgMTUuNzE0IDN6TTguNSA3LjI1VjQuNWg2djIuNzVhLjc1Ljc1IDAgMCAxLS43NS43NWgtNC41YS43NS43NSAwIDAgMS0uNzUtLjc1TTE5LjcxNSAxMWgtLjAwMmMtLjU4NSAwLTEuMTcuMjIzLTEuNjE1LjY3bC01LjkwMiA1LjkwMmEyLjcgMi43IDAgMCAwLS43MDcgMS4yNDdsLS40NTggMS44MzFhMS4wODcgMS4wODcgMCAwIDAgMS4zMTkgMS4zMThsMS44My0uNDU3YTIuNyAyLjcgMCAwIDAgMS4yNDgtLjcwN2w1LjkwMi01LjkwMkEyLjI4NSAyLjI4NSAwIDAgMCAxOS43MTUgMTEiIC8+Cjwvc3ZnPg==',
    delete:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgNDggNDgiPgoJPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSJub25lIiAvPgoJPHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjAgMTAuNXYuNWg4di0uNWE0IDQgMCAwIDAtOCAwbS0yLjUuNXYtLjVhNi41IDYuNSAwIDEgMSAxMyAwdi41aDExLjI1YTEuMjUgMS4yNSAwIDEgMSAwIDIuNWgtMi45MTdsLTIgMjMuODU2QTcuMjUgNy4yNSAwIDAgMSAyOS42MDggNDRIMTguMzkyYTcuMjUgNy4yNSAwIDAgMS03LjIyNC02LjY0NGwtMi0yMy44NTZINi4yNWExLjI1IDEuMjUgMCAxIDEgMC0yLjV6bS0zLjg0MSAyNi4xNDdhNC43NSA0Ljc1IDAgMCAwIDQuNzMzIDQuMzUzaDExLjIxNmE0Ljc1IDQuNzUgMCAwIDAgNC43MzQtNC4zNTNMMzYuMzI0IDEzLjVIMTEuNjc2ek0yMS41IDIwLjI1YTEuMjUgMS4yNSAwIDEgMC0yLjUgMHYxNC41YTEuMjUgMS4yNSAwIDEgMCAyLjUgMHpNMjcuNzUgMTljLjY5IDAgMS4yNS41NiAxLjI1IDEuMjV2MTQuNWExLjI1IDEuMjUgMCAxIDEtMi41IDB2LTE0LjVjMC0uNjkuNTYtMS4yNSAxLjI1LTEuMjUiIC8+Cjwvc3ZnPg==',
  },
};
