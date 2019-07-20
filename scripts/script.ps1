Param($selfpid);

<# 指定したidからプロセスを取得する #>
function getProcessById($id, $allprocess) {
  foreach($process in $allprocess) {
    if ($process.Handle -eq $id) {
      return $process;
    }
  }
}

function stopProcessById($id) {
  Stop-Process -Id $id;
}

<#

#>
function checkProcess($process, $allprocess) {
  if ($process.Handle -eq $process.ParentProcessId) {
    return $false;
  } elseif ($selfpid -eq $process.ParentProcessId) {
    return $true;
  } else {
    $nextProcess = getProcessById $process.ParentProcessId $allprocess;
    checkProcess $nextProcess $allprocess;
  }
}

<# メイン関数 #>
function main() {
  $allprocess = Get-WmiObject Win32_Process;
  $hitProcessIds = @();
  foreach($process in $allprocess) {
    $tmp = checkProcess $process $allprocess;
    if ($tmp) {
      $hitProcessIds += $process.Handle;
    }
  }

  foreach($hitProcessId in $hitProcessIds) {
    # 存在しないプロセスIDを指定するとエラーが起きる。
    stopProcessById($hitProcessId);
  }
}

main;
