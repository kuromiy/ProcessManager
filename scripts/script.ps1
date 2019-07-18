Param($selfpid);

<# 指定したidからプロセスを取得する #>
function getProcessById($id) {
  # TODO $allprocessから指定された$idを取り出すようにしたい。
  return Get-WmiObject -Class Win32_Process -Filter "ProcessId = $id"
}

function stopProcessById($id) {
  Stop-Process -Id $id;
}

<#

#>
function checkProcess($process) {
  if ($process.Handle -eq $process.ParentProcessId) {
    return $false;
  } elseif ($selfpid -eq $process.ParentProcessId) {
    return $true;
  } else {
    $nextProcess = getProcessById($process.ParentProcessId);
    checkProcess($nextProcess);
  }
}

<# メイン関数 #>
function main() {
  Write-Host $selfpid;
  $allprocess = Get-WmiObject Win32_Process;
  $hitProcessIds = @();
  foreach($process in $allprocess) {
    $tmp = checkProcess($process);
    if ($tmp) {
      Write-Host -NoNewline $process.ExecutablePath $process.Handle $process.ParentProcessId;
      $hitProcessIds += $process.Handle;
    }
  }

  foreach($hitProcessId in $hitProcessIds) {
    # 存在しないプロセスIDを指定するとエラーが起きる。
    stopProcessById($hitProcessId);
  }
}

main;
