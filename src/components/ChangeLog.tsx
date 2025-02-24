export default function ChangeLog() {
  return (
    <div>
      <h1>Change Log</h1>
      <hr/>

      <div>
        <strong>Feb 24, 2025</strong>
        <ul>
          <li>Removed the Historical Market tab due to issues with the amount of data it was trying to load</li>
        </ul>
      </div>

      <div>
        <strong>Feb 22, 2025: Fork and Update</strong>
        <ul>
          <li>Forked from <a href="https://github.com/MWISim/cowculator">github.com/MWISim/cowculator</a></li>
          <li>Updated the game data</li>
          <li>Allow the app to be used before market data has loaded</li>
          <li>Add button to manually refresh market data</li>
          <li>Tweaked UI to keep top tab bar always on screen</li>
          <li>Improve startup time by delaying the load of the Market tab</li>
        </ul>
      </div>

    </div>
  )
}
